import { Blinds, Lightbulb, SprayCanIcon, Droplets, Flower2, Leaf, Plane, Sun } from 'lucide-react';

import { Layout } from '@/components/Layout';
import { ToggleSwitch } from '@/components/ToggleSwitch';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

export default function Control() {
  const { sensor, devices, lastWater, toggleDevice, setDeviceAuto, activateScene } = useAppStore();

  const curtain = devices.find((d) => d.id === 'curtain');
  const led = devices.find((d) => d.id === 'led');
  const spray = devices.find((d) => d.id === 'spray');
  const pump = devices.find((d) => d.id === 'pump');

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* 左栏 - 环境控制 */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold mb-5 flex items-center gap-2">
              <Sun size={18} className="text-[#7DB87D]" /> 环境控制
            </h3>

            {/* 窗帘 */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#F5F0E8] mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#7DB87D]">
                  <Blinds size={18} />
                </div>
                <div>
                  <div className="font-medium">窗帘</div>
                  <div className="text-xs text-gray-500">统一控制四面窗帘开关</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ToggleSwitch checked={curtain?.on ?? false} onChange={() => toggleDevice('curtain')} />
                <ToggleSwitch checked={curtain?.auto ?? false} onChange={(v) => setDeviceAuto('curtain', v)} size="sm" />
                <span className="text-xs text-gray-500">自动</span>
              </div>
            </div>

            {/* 光照读数 */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#F5F0E8]">
                <div className="text-xs text-gray-500">光照 1</div>
                <div className="text-lg font-bold font-serif">{sensor.lux_a} <span className="text-xs font-normal">lux</span></div>
              </div>
              <div className="p-3 rounded-xl bg-[#F5F0E8]">
                <div className="text-xs text-gray-500">光照 2</div>
                <div className="text-lg font-bold font-serif">{sensor.lux_b} <span className="text-xs font-normal">lux</span></div>
              </div>
            </div>

            {/* 自动遮阳 */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#F5F0E8]/60 mb-4">
              <div>
                <div className="font-medium text-sm">自动遮阳模式</div>
                <div className="text-xs text-gray-500">当任一光照超过 30000 lux 时自动关闭窗帘</div>
              </div>
              <ToggleSwitch checked={curtain?.auto ?? false} onChange={(v) => setDeviceAuto('curtain', v)} />
            </div>

            {/* 补光灯 */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#F5F0E8]/60 mb-4">
              <div className="flex items-center gap-3">
                <Lightbulb size={18} className="text-yellow-500" />
                <div>
                  <div className="font-medium text-sm">补光灯</div>
                  <div className="text-xs text-gray-500">当前 {led?.on ? '已开启' : '已关闭'}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ToggleSwitch checked={led?.on ?? false} onChange={() => toggleDevice('led')} />
                <ToggleSwitch checked={led?.auto ?? false} onChange={(v) => setDeviceAuto('led', v)} size="sm" />
                <span className="text-xs text-gray-500">自动</span>
              </div>
            </div>

            {/* 自动补光 */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#F5F0E8]/60 mb-4">
              <div>
                <div className="font-medium text-sm">自动补光模式</div>
                <div className="text-xs text-gray-500">当环境光低于 5000 lux 时自动开启补光</div>
              </div>
              <ToggleSwitch checked={led?.auto ?? false} onChange={(v) => setDeviceAuto('led', v)} />
            </div>

            {/* 喷雾 */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#F5F0E8]/60">
              <div className="flex items-center gap-3">
                <SprayCanIcon size={18} className="text-cyan-500" />
                <div>
                  <div className="font-medium text-sm">喷雾加湿</div>
                  <div className="text-xs text-gray-500">当前 {spray?.on ? '运行中' : '待机'}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ToggleSwitch checked={spray?.on ?? false} onChange={() => toggleDevice('spray')} />
                <ToggleSwitch checked={spray?.auto ?? false} onChange={(v) => setDeviceAuto('spray', v)} size="sm" />
                <span className="text-xs text-gray-500">自动</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右栏 - 浇水控制 */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold mb-5 flex items-center gap-2">
              <Droplets size={18} className="text-blue-500" /> 浇水控制
            </h3>

            <div className="text-center mb-5">
              <div className="text-5xl font-bold font-serif text-blue-500">{sensor.soil_moisture}<span className="text-2xl">%</span></div>
              <div className="text-xs text-gray-500 mt-1">土壤湿度</div>
            </div>

            <div className="h-3 rounded-full bg-gray-100 overflow-hidden mb-4">
              <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${sensor.soil_moisture}%` }} />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F0E8]/60 mb-4">
              <div>
                <div className="font-medium text-sm">自动浇水</div>
                <div className="text-xs text-gray-500">当土壤湿度低于 30% 时自动浇水</div>
              </div>
              <ToggleSwitch checked={pump?.auto ?? false} onChange={(v) => setDeviceAuto('pump', v)} />
            </div>

            <button
              onClick={() => toggleDevice('pump')}
              className="w-full py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-md transition-all active:scale-[0.98]"
            >
              {pump?.on ? '停止浇水' : '立即浇水'}
            </button>

            <div className="mt-4 text-xs text-gray-500 text-center">
              上次浇水：{lastWater.time} · 浇水量 {lastWater.amount}
            </div>
          </div>

          {/* 场景模式 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold mb-4">一键场景</h3>
            <div className="space-y-3">
              <button
                onClick={() => activateScene('flower')}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 flex items-center gap-3 transition-all"
              >
                <Flower2 className="text-pink-500" size={22} />
                <div className="text-left">
                  <div className="font-bold text-sm text-[#333333]">赏花模式</div>
                  <div className="text-xs text-gray-500">窗帘打开 + 补光灯亮 + 喷雾开启</div>
                </div>
              </button>
              <button
                onClick={() => activateScene('energy')}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 flex items-center gap-3 transition-all"
              >
                <Leaf className="text-green-600" size={22} />
                <div className="text-left">
                  <div className="font-bold text-sm text-[#333333]">节能模式</div>
                  <div className="text-xs text-gray-500">关闭所有非必要设备，仅保留传感器监测</div>
                </div>
              </button>
              <button
                onClick={() => activateScene('away')}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 flex items-center gap-3 transition-all"
              >
                <Plane className="text-blue-600" size={22} />
                <div className="text-left">
                  <div className="font-bold text-sm text-[#333333]">外出模式</div>
                  <div className="text-xs text-gray-500">全自动运行，异常时推送提醒</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
