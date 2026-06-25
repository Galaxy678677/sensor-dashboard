import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { DiagnosisRecord } from '@/types';
import { RESULT_LABELS, RESULT_COLORS } from '@/types';

interface DiagnosisCardProps {
  record: DiagnosisRecord;
}

export function DiagnosisCard({ record }: DiagnosisCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn('bg-white rounded-2xl p-4 shadow-sm transition-all', record.result !== 'healthy' && 'border border-red-100')}>
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-xl bg-[#F5F0E8] flex items-center justify-center shrink-0 overflow-hidden">
          <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#7DB87D]">
            <path fill="currentColor" d="M32 4C20 4 12 16 12 28c0 14 20 32 20 32s20-18 20-32C52 16 44 4 32 4z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className={cn('inline-block px-2 py-0.5 rounded-full text-xs text-white font-medium', RESULT_COLORS[record.result])}>
                {RESULT_LABELS[record.result]}
              </span>
              <div className="text-xs text-gray-400 mt-1">{record.time}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold font-serif text-[#333333]">{record.confidence}%</div>
              <div className="text-[10px] text-gray-400">置信度</div>
            </div>
          </div>
          {record.result !== 'healthy' && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 flex items-center gap-1 text-xs text-[#7DB87D] font-medium hover:underline"
            >
              {expanded ? '收起建议' : '查看建议'}
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
      </div>
      {expanded && record.result !== 'healthy' && (
        <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600 bg-[#F5F0E8]/50 rounded-lg p-3">
          {record.suggestion}
        </div>
      )}
    </div>
  );
}
