import { create } from 'zustand';
import type { SensorData, DeviceState, DeviceCommand, HistoryPoint, EventLog, DiagnosisRecord } from '@/types';
import { generateMockHistory, generateMockEvents, generateMockDiagnosis, makeMockSensor } from '@/utils/mockData';

interface AppState {
  useRealDevice: boolean;
  mqttConnected: boolean;
  brokerUrl: string;
  topicData: string;
  topicCmd: string;

  sensor: SensorData;
  devices: DeviceState[];
  history: HistoryPoint[];
  events: EventLog[];
  diagnosis: DiagnosisRecord[];

  lastWater: { time: string; amount: string };

  setUseRealDevice: (v: boolean) => void;
  setMqttConnected: (v: boolean) => void;
  updateSensor: (data: Partial<SensorData>) => void;
  toggleDevice: (id: string) => void;
  setDeviceAuto: (id: string, auto: boolean) => void;
  sendCommand: (cmd: DeviceCommand) => void;
  activateScene: (scene: 'flower' | 'energy' | 'away') => void;
  addEvent: (event: EventLog) => void;
}

const initialDevices: DeviceState[] = [
  { id: 'curtain', name: '窗帘', on: true, auto: true, icon: 'Blinds', description: '自动遮阳' },
  { id: 'pump', name: '水泵', on: false, auto: true, icon: 'Droplets', description: '自动浇水' },
  { id: 'spray', name: '加湿器', on: false, auto: true, icon: 'SprayCanIcon', description: '自动喷雾' },
  { id: 'led', name: '补光灯', on: false, auto: true, icon: 'Lightbulb', description: '自动补光' },
];

export const useAppStore = create<AppState>((set, get) => ({
  useRealDevice: false,
  mqttConnected: false,
  brokerUrl: 'wss://broker.emqx.io:8084/mqtt',
  topicData: 'stm32/sensor/data',
  topicCmd: 'stm32/sensor/cmd',

  sensor: makeMockSensor(),
  devices: initialDevices,
  history: generateMockHistory(30),
  events: generateMockEvents(8),
  diagnosis: generateMockDiagnosis(6),
  lastWater: { time: '今天 10:30', amount: '约 80ml' },

  setUseRealDevice: (v) => set({ useRealDevice: v }),
  setMqttConnected: (v) => set({ mqttConnected: v }),

  updateSensor: (data) => {
    set((state) => ({
      sensor: { ...state.sensor, ...data, timestamp: new Date().toISOString() },
    }));
  },

  toggleDevice: (id) => {
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === id ? { ...d, on: !d.on, auto: false } : d
      ),
    }));
    const dev = get().devices.find((d) => d.id === id);
    if (dev) {
      get().sendCommand({ device: id as DeviceCommand['device'], action: dev.on ? 'off' : 'on' });
    }
  },

  setDeviceAuto: (id, auto) => {
    set((state) => ({
      devices: state.devices.map((d) => (d.id === id ? { ...d, auto } : d)),
    }));
    get().sendCommand({ device: id as DeviceCommand['device'], action: 'auto' });
  },

  sendCommand: (cmd) => {
    if (get().useRealDevice && get().mqttConnected) {
      // 真实 MQTT 发送由 useMQTT hook 处理
      window.dispatchEvent(new CustomEvent('mqtt-send-cmd', { detail: cmd }));
    }
    console.log('[CMD]', cmd);
  },

  activateScene: (scene) => {
    let newDevices = [...get().devices];
    if (scene === 'flower') {
      newDevices = newDevices.map((d) =>
        d.id === 'curtain' ? { ...d, on: true, auto: false }
          : d.id === 'led' ? { ...d, on: true, auto: false }
          : d.id === 'spray' ? { ...d, on: true, auto: false }
          : d
      );
    } else if (scene === 'energy') {
      newDevices = newDevices.map((d) =>
        ['curtain', 'led', 'spray'].includes(d.id)
          ? { ...d, on: false, auto: false }
          : d
      );
    } else if (scene === 'away') {
      newDevices = newDevices.map((d) => ({ ...d, auto: true }));
    }
    set({ devices: newDevices });
    get().sendCommand({ device: 'scene', action: 'mode', value: scene });
  },

  addEvent: (event) => {
    set((state) => ({
      events: [event, ...state.events].slice(0, 50),
    }));
  },
}));
