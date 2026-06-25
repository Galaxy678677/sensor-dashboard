import { useMemo, useState } from 'react';
import { Search, Download } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { LineChart } from '@/components/LineChart';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

const ranges = ['今日', '本周', '本月', '自定义'];

export default function History() {
  const { history, events } = useAppStore();
  const [range, setRange] = useState('本周');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const chartData = useMemo(() => {
    return history.slice(-15).map((h) => ({
      time: h.time.slice(5),
      lux_a: h.lux_a,
      lux_b: h.lux_b,
      temp: h.temp,
      humi: h.humi,
      soil: h.soil_moisture,
    }));
  }, [history]);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => e.desc.includes(search) || e.type.includes(search));
  }, [events, search]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / pageSize));
  const pagedEvents = filteredEvents.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* 时间范围 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-2">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => { setRange(r); setPage(1); }}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                range === r ? 'bg-[#7DB87D] text-white shadow' : 'bg-[#F5F0E8] text-gray-600 hover:bg-[#7DB87D]/10'
              )}
            >
              {r}
            </button>
          ))}
          {range === '自定义' && (
            <div className="flex items-center gap-2 ml-2">
              <input type="date" className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm" />
              <span className="text-gray-400">-</span>
              <input type="date" className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm" />
            </div>
          )}
        </div>

        {/* 图表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm">光照变化趋势</h3>
              <span className="text-[10px] text-gray-400">平均: {Math.round(chartData.reduce((a, b) => a + b.lux_a, 0) / chartData.length || 0)} lux</span>
            </div>
            <LineChart data={chartData.map((d) => ({ label: d.time, value: d.lux_a }))} color="#F5A623" unit="lux" />
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm">温度变化趋势</h3>
              <span className="text-[10px] text-gray-400">平均: {(chartData.reduce((a, b) => a + b.temp, 0) / chartData.length || 0).toFixed(1)}°C</span>
            </div>
            <LineChart data={chartData.map((d) => ({ label: d.time, value: d.temp }))} color="#E85D5D" unit="°C" />
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm">空气湿度趋势</h3>
              <span className="text-[10px] text-gray-400">平均: {Math.round(chartData.reduce((a, b) => a + b.humi, 0) / chartData.length || 0)}%</span>
            </div>
            <LineChart data={chartData.map((d) => ({ label: d.time, value: d.humi }))} color="#4A90E2" unit="%" />
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm">土壤湿度趋势</h3>
              <span className="text-[10px] text-gray-400">平均: {Math.round(chartData.reduce((a, b) => a + b.soil, 0) / chartData.length || 0)}%</span>
            </div>
            <LineChart data={chartData.map((d) => ({ label: d.time, value: d.soil }))} color="#7DB87D" unit="%" />
          </div>
        </div>

        {/* 事件日志 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="font-bold text-sm">养护事件日志</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="搜索事件..."
                  className="pl-8 pr-3 py-1.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#7DB87D]"
                />
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F5F0E8] text-xs font-medium hover:bg-[#7DB87D]/10">
                <Download size={14} /> 导出 CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="pb-3 font-medium">时间</th>
                  <th className="pb-3 font-medium">事件类型</th>
                  <th className="pb-3 font-medium">触发方式</th>
                  <th className="pb-3 font-medium">详情</th>
                </tr>
              </thead>
              <tbody>
                {pagedEvents.map((e) => (
                  <tr key={e.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F5F0E8]/30">
                    <td className="py-3 text-gray-600">{e.time}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full bg-[#F5F0E8] text-xs">{e.type}</span>
                    </td>
                    <td className="py-3 text-gray-600">{e.trigger}</td>
                    <td className="py-3 text-gray-600">{e.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页 */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 rounded-lg bg-[#F5F0E8] text-xs disabled:opacity-40"
            >
              上一页
            </button>
            <span className="text-xs text-gray-500">{page} / {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 rounded-lg bg-[#F5F0E8] text-xs disabled:opacity-40"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
