export interface SensorData {
  lux_a: number;
  lux_b: number;
  temp: number;
  humi: number;
  soil_moisture: number;
  soil_temp: number;
  timestamp: string;
}

export interface DeviceState {
  id: string;
  name: string;
  on: boolean;
  auto: boolean;
  icon: string;
  description?: string;
}

export interface DeviceCommand {
  device: 'curtain' | 'led' | 'spray' | 'pump' | 'scene';
  action: 'on' | 'off' | 'auto' | 'mode';
  value?: number | string;
}

export interface HistoryPoint {
  time: string;
  lux_a: number;
  lux_b: number;
  temp: number;
  humi: number;
  soil_moisture: number;
}

export interface EventLog {
  id: string;
  time: string;
  type: 'water' | 'spray' | 'curtain' | 'led' | 'warning';
  trigger: '自动' | '手动' | 'AI联动';
  desc: string;
}

export interface DiagnosisRecord {
  id: string;
  image: string;
  result: 'healthy' | 'yellow' | 'burnt' | 'disease';
  confidence: number;
  time: string;
  suggestion: string;
}

export type DiagnosisResult = 'healthy' | 'yellow' | 'burnt' | 'disease';

export const RESULT_LABELS: Record<DiagnosisResult, string> = {
  healthy: '健康',
  yellow: '黄叶',
  burnt: '焦边',
  disease: '病害',
};

export const RESULT_COLORS: Record<DiagnosisResult, string> = {
  healthy: 'bg-green-500',
  yellow: 'bg-yellow-500',
  burnt: 'bg-orange-500',
  disease: 'bg-red-500',
};

export const EVENT_TYPE_LABELS: Record<EventLog['type'], string> = {
  water: '浇水',
  spray: '喷雾',
  curtain: '遮阳',
  led: '补光',
  warning: '警告',
};
