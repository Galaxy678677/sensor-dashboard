import { useEffect } from 'react';
import { Sun, Thermometer, Droplets, Sprout, Blinds, Lightbulb, SprayCanIcon } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { MetricRing } from '@/components/MetricRing';
import { EventTimeline } from '@/components/EventTimeline';
import { useAppStore } from '@/store/appStore';
import { simulateSensorUpdate } from '@/utils/mockData';

const iconMap: Record<string, typeof Blinds> = {
  Blinds,
  Lightbulb,
  SprayCanIcon,
  Droplets,
};

export default function Dashboard() {
  const { sensor, devices, events, diagnosis, updateSensor, useRealDevice } = useAppStore();

  // 模拟数据定时更新
  useEffect(() => {
    if (useRealDevice) return;
    const id = setInterval(() => {
      updateSensor(simulateSensorUpdate(useAppStore.getState().sensor));
    }, 3000);
    return () => clearInterval(id);
  }, [useRealDevice, updateSensor]);

  const latestDiagnosis = diagnosis[0];
  const healthyRate = Math.round((diagnosis.filter((d) => d.result === 'healthy').length / diagnosis.length) * 100);

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* 左栏 */}
        <div className="lg:col-span-3 space-y-6">
          {/* OLED 风格显示 */}
          <div className="bg-[#2D3436] rounded-3xl p-5 text-white shadow-lg">
            <div className="aspect-video rounded-2xl bg-[#1E2729] flex flex-col items-center justify-center border border-gray-700/50">
              <div className="text-5xl mb-2">🌱</div>
              <div className="text-sm text-gray-400">温度: {sensor.temp.toFixed(1)}°C</div>
              <div className="text-sm text-gray-400">湿度: {sensor.humi}%</div>
            </div>
            <div className="mt-4 text-center text-xs text-gray-400">设备端 OLED 模拟显示</div>
          </div>

          {/* 实时照片卡 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium">健康</span>
            </div>
            <div className="aspect-[4/3] rounded-xl bg-[#F5F0E8] flex items-center justify-center">
              <span className="text-6xl">🌿</span>
            </div>
            <div className="mt-3 text-xs text-gray-400 text-center">
              画面刷新于 {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* 中栏 */}
        <div className="lg:col-span-6 space-y-6">
          {/* 环境指标 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <Sun size={18} className="text-[#7DB87D]" /> 环境传感器
            </h3>
            <div className="grid grid-cols-5 gap-3">
              <MetricRing value={sensor.lux_a} max={5000} label="光照1" unit="lux" color="#F5A623" icon={<Sun size={16} />} />
              <MetricRing value={sensor.lux_b} max={5000} label="光照2" unit="lux" color="#F5A623" icon={<Sun size={16} />} />
              <MetricRing value={sensor.temp} max={40} label="气温" unit="°C" color="#E85D5D" icon={<Thermometer size={16} />} />
              <MetricRing value={sensor.humi} max={100} label="湿度" unit="%" color="#4A90E2" icon={<Droplets size={16} />} />
              <MetricRing value={sensor.soil_moisture} max={100} label="土湿" unit="%" color="#7DB87D" icon={<Sprout size={16} />} />
            </div>
          </div>

          {/* AI 报告 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <Sprout size={18} className="text-[#7DB87D]" /> AI 叶片健康报告
            </h3>
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-xl bg-[#F5F0E8] flex items-center justify-center shrink-0">
                <span className="text-4xl">🍃</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-green-500 text-white text-xs font-medium">
                    {latestDiagnosis?.result === 'healthy' ? '健康' : '需关注'}
                  </span>
                  <span className="text-xs text-gray-400">刚刚</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  叶片状态良好，未发现病虫害。置信度 <span className="font-bold text-[#333333]">{healthyRate}%</span>。
                </p>
              </div>
            </div>
          </div>

          {/* 土壤状态 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-bold mb-4">土壤状态</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">土壤湿度</span>
                  <span className="font-medium">{sensor.soil_moisture}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-blue-500 transition-all duration-700" style={{ width: `${sensor.soil_moisture}%` }} />
                </div>
                <div className="text-[10px] text-gray-400 mt-1">正常范围 30%~60%</div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">土壤温度</span>
                  <span className="font-medium">{sensor.soil_temp.toFixed(1)}°C</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-orange-400 transition-all duration-700" style={{ width: `${(sensor.soil_temp / 40) * 100}%` }} />
                </div>
                <div className="text-[10px] text-gray-400 mt-1">正常范围 18°C~28°C</div>
              </div>
            </div>
          </div>
        </div>

        {/* 右栏 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 设备概览 - 只读 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-bold mb-4">设备状态</h3>
            <div className="space-y-2">
              {devices.map((d) => {
                const Icon = iconMap[d.icon] || Blinds;
                return (
                  <div key={d.id} className="flex items-center justify-between p-3 rounded-xl bg-[#F5F0E8]/60">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${d.on ? 'bg-[#7DB87D] text-white' : 'bg-gray-200 text-gray-500'}`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#333333]">{d.name}</div>
                        <div className="text-xs text-gray-500">
                          {d.auto ? '自动模式' : d.on ? '已开启' : '已关闭'}
                        </div>
                      </div>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${d.on ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                      {d.on ? 'ON' : 'OFF'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 最近事件 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-bold mb-4">最近事件</h3>
            <EventTimeline events={events.slice(0, 4)} />
            <button className="mt-2 text-xs text-[#7DB87D] font-medium hover:underline">
              查看全部记录 →
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
