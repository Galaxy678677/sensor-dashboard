import type { SensorData, HistoryPoint, EventLog, DiagnosisRecord, DiagnosisResult } from '@/types';

export function makeMockSensor(): SensorData {
  return {
    lux_a: 3200,
    lux_b: 2800,
    temp: 26.2,
    humi: 65,
    soil_moisture: 42,
    soil_temp: 24.1,
    timestamp: new Date().toISOString(),
  };
}

export function generateMockHistory(days = 30): HistoryPoint[] {
  const arr: HistoryPoint[] = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const baseLux = 2500 + Math.sin(i * 0.3) * 1500;
    arr.push({
      time: t.toISOString().slice(0, 10),
      lux_a: Math.max(0, Math.round(baseLux + Math.random() * 400)),
      lux_b: Math.max(0, Math.round(baseLux * 0.9 + Math.random() * 300)),
      temp: Number((24 + Math.sin(i * 0.2) * 3 + Math.random()).toFixed(1)),
      humi: Math.min(90, Math.max(40, Math.round(60 + Math.sin(i * 0.4) * 10 + Math.random() * 5))),
      soil_moisture: Math.min(70, Math.max(25, Math.round(42 + Math.sin(i * 0.5) * 12 + Math.random() * 4))),
    });
  }
  return arr;
}

export function generateMockEvents(count = 8): EventLog[] {
  const events: EventLog[] = [
    { id: '1', time: '10:30', type: 'water', trigger: '自动', desc: '自动浇水完成' },
    { id: '2', time: '09:15', type: 'spray', trigger: '自动', desc: '自动喷雾完成' },
    { id: '3', time: '08:00', type: 'curtain', trigger: '自动', desc: '窗帘自动打开' },
    { id: '4', time: '昨天 18:00', type: 'water', trigger: '手动', desc: '手动浇水' },
    { id: '5', time: '昨天 14:20', type: 'led', trigger: 'AI联动', desc: '光照不足，补光灯开启' },
    { id: '6', time: '昨天 10:00', type: 'spray', trigger: '自动', desc: '自动喷雾完成' },
    { id: '7', time: '前天 16:45', type: 'warning', trigger: 'AI联动', desc: '检测到叶片发黄' },
    { id: '8', time: '前天 09:30', type: 'curtain', trigger: '自动', desc: '窗帘自动关闭' },
  ];
  return events.slice(0, count);
}

const suggestions: Record<DiagnosisResult, string> = {
  healthy: '植物状态良好，继续保持当前养护方案。',
  yellow: '建议减少浇水频率，检查土壤排水性，适当补充氮肥。',
  burnt: '避免强光直射，调整窗帘遮阳时间，增加环境湿度。',
  disease: '建议隔离病叶并喷洒适量杀菌剂，保持叶片干燥通风。',
};

export function generateMockDiagnosis(count = 6): DiagnosisRecord[] {
  const results: DiagnosisResult[] = ['healthy', 'yellow', 'burnt', 'disease', 'healthy', 'yellow'];
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const t = new Date(now.getTime() - i * 86400000 * (1 + Math.floor(Math.random() * 2)));
    const r = results[i % results.length];
    return {
      id: String(i + 1),
      image: '/leaf-placeholder.svg',
      result: r,
      confidence: Number((85 + Math.random() * 14).toFixed(1)),
      time: `${t.getMonth() + 1}月${t.getDate()}日 ${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}`,
      suggestion: suggestions[r],
    };
  });
}

export function simulateSensorUpdate(prev: SensorData): SensorData {
  return {
    lux_a: Math.max(0, Math.round(prev.lux_a + (Math.random() - 0.5) * 60)),
    lux_b: Math.max(0, Math.round(prev.lux_b + (Math.random() - 0.5) * 50)),
    temp: Number((prev.temp + (Math.random() - 0.5) * 0.2).toFixed(1)),
    humi: Math.min(95, Math.max(30, Math.round(prev.humi + (Math.random() - 0.5) * 2))),
    soil_moisture: Math.min(80, Math.max(20, Math.round(prev.soil_moisture + (Math.random() - 0.5) * 1))),
    soil_temp: Number((prev.soil_temp + (Math.random() - 0.5) * 0.1).toFixed(1)),
    timestamp: new Date().toISOString(),
  };
}
