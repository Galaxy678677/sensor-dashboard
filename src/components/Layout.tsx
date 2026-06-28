import { Link, useLocation } from 'react-router-dom';
import { Leaf, LayoutDashboard, SlidersHorizontal, History, Stethoscope, Info } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: '仪表盘', icon: LayoutDashboard },
  { path: '/control', label: '设备控制', icon: SlidersHorizontal },
  { path: '/history', label: '历史数据', icon: History },
  { path: '/diagnosis', label: 'AI诊断', icon: Stethoscope },
  { path: '/about', label: '关于', icon: Info },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { useRealDevice, mqttConnected, lastDeviceDataTime, setUseRealDevice } = useAppStore();
  const deviceConnected = useRealDevice && mqttConnected && Date.now() - lastDeviceDataTime < 10000;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E8] text-[#333333] font-sans">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#7DB87D]/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#7DB87D] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Leaf size={20} />
            </div>
            <span className="text-lg font-bold tracking-tight">智能植物养护系统</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all',
                    active
                      ? 'bg-[#7DB87D] text-white shadow'
                      : 'text-[#555555] hover:bg-[#7DB87D]/10'
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span
                className={cn(
                  'w-2 h-2 rounded-full',
                  deviceConnected
                    ? 'bg-green-500'
                    : useRealDevice
                      ? 'bg-yellow-400 animate-pulse'
                      : 'bg-gray-400'
                )}
              />
              <span className="text-gray-500">
                {deviceConnected
                  ? '已连接设备'
                  : useRealDevice
                    ? '连接中...'
                    : '模拟数据'}
              </span>
            </div>
            <button
              onClick={() => setUseRealDevice(!useRealDevice)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                useRealDevice
                  ? deviceConnected
                    ? 'bg-[#7DB87D] text-white border-[#7DB87D]'
                    : 'bg-yellow-50 text-yellow-700 border-yellow-300'
                  : 'bg-white text-[#555555] border-gray-300 hover:border-[#7DB87D]'
              )}
            >
              {useRealDevice ? (deviceConnected ? '真实设备' : '连接中...') : '模拟数据'}
            </button>
          </div>
        </div>
      </header>

      {/* 移动端导航 */}
      <nav className="md:hidden flex overflow-x-auto bg-white border-b border-[#7DB87D]/20 px-2 py-2 gap-1">
        {navItems.map((item) => {
          const active = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-1 px-3 py-2 rounded-full text-xs whitespace-nowrap font-medium',
                active ? 'bg-[#7DB87D] text-white' : 'text-[#555555]'
              )}
            >
              <Icon size={14} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* 主内容 */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* 底部信息栏 */}
      <footer className="bg-white border-t border-[#7DB87D]/20 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-1">
          <span className="inline-flex items-center gap-1">
            <Leaf size={12} className="text-[#7DB87D]" />
            Powered by STM32N6 · 正点原子 · 意法半导体
          </span>
          <span className="hidden sm:inline">·</span>
          <span>研发团队：嵌入灵魂 · 2026</span>
        </div>
      </footer>
    </div>
  );
}
