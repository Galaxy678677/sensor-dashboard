import { useEffect, useRef } from 'react';
import mqtt from 'mqtt';
import type { DeviceCommand, SensorData } from '@/types';
import { useAppStore } from '@/store/appStore';

export function useMQTT() {
  const clientRef = useRef<mqtt.MqttClient | null>(null);
  const {
    useRealDevice,
    brokerUrl,
    topicData,
    topicCmd,
    setMqttConnected,
    updateSensor,
  } = useAppStore();

  useEffect(() => {
    if (!useRealDevice) {
      setMqttConnected(false);
      if (clientRef.current) {
        clientRef.current.end();
        clientRef.current = null;
      }
      return;
    }

    const client = mqtt.connect(brokerUrl, {
      clientId: 'web-plant-' + Math.random().toString(16).slice(2, 8),
      clean: true,
      reconnectPeriod: 5000,
    });

    clientRef.current = client;

    client.on('connect', () => {
      setMqttConnected(true);
      client.subscribe(topicData);
    });

    client.on('message', (_topic, payload) => {
      if (_topic === topicData) {
        try {
          const data = JSON.parse(payload.toString()) as Partial<SensorData>;
          updateSensor(data);
        } catch (e) {
          console.warn('MQTT payload parse error', e);
        }
      }
    });

    client.on('close', () => {
      setMqttConnected(false);
    });

    client.on('error', (err) => {
      console.error('MQTT error', err);
      setMqttConnected(false);
    });

    const sendHandler = (e: Event) => {
      const cmd = (e as CustomEvent<DeviceCommand>).detail;
      if (client.connected) {
        client.publish(topicCmd, JSON.stringify(cmd));
      }
    };
    window.addEventListener('mqtt-send-cmd', sendHandler);

    return () => {
      window.removeEventListener('mqtt-send-cmd', sendHandler);
      client.end();
      clientRef.current = null;
    };
  }, [useRealDevice, brokerUrl, topicData, topicCmd, setMqttConnected, updateSensor]);
}
