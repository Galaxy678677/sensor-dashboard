import { useMemo, useState } from 'react';
import { Stethoscope, Activity, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { DiagnosisCard } from '@/components/DiagnosisCard';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';
import type { DiagnosisResult } from '@/types';
import { RESULT_LABELS } from '@/types';

const filters: { key: 'all' | DiagnosisResult; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'healthy', label: '健康' },
  { key: 'yellow', label: '黄叶' },
  { key: 'burnt', label: '焦边' },
  { key: 'disease', label: '病害' },
];

export default function Diagnosis() {
  const { diagnosis } = useAppStore();
  const [filter, setFilter] = useState<'all' | DiagnosisResult>('all');

  const stats = useMemo(() => {
    const total = diagnosis.length;
    const healthy = diagnosis.filter((d) => d.result === 'healthy').length;
    const abnormal = total - healthy;
    const rate = total ? Math.round((healthy / total) * 100) : 0;
    return { total, healthy, abnormal, rate };
  }, [diagnosis]);

  const filtered = useMemo(() => {
    return filter === 'all' ? diagnosis : diagnosis.filter((d) => d.result === filter);
  }, [diagnosis, filter]);

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* 统计概览 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Stethoscope size={18} />
            </div>
            <div>
              <div className="text-lg font-bold font-serif">{stats.total}</div>
              <div className="text-xs text-gray-500">总诊断次数</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <div className="text-lg font-bold font-serif">{stats.healthy}</div>
              <div className="text-xs text-gray-500">健康次数</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
              <AlertCircle size={18} />
            </div>
            <div>
              <div className="text-lg font-bold font-serif">{stats.abnormal}</div>
              <div className="text-xs text-gray-500">异常次数</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <Activity size={18} />
            </div>
            <div>
              <div className="text-lg font-bold font-serif">{stats.rate}%</div>
              <div className="text-xs text-gray-500">当前健康率</div>
            </div>
          </div>
        </div>

        {/* 筛选器 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                filter === f.key ? 'bg-[#7DB87D] text-white shadow' : 'bg-[#F5F0E8] text-gray-600 hover:bg-[#7DB87D]/10'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 记录列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((record) => (
            <DiagnosisCard key={record.id} record={record} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-2xl shadow-sm">
              <XCircle size={32} className="mx-auto mb-2" />
              暂无记录
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
