import { cn } from '@/lib/utils';

interface MetricRingProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
  icon?: React.ReactNode;
}

export function MetricRing({ value, max, label, unit, color = '#7DB87D', icon }: MetricRingProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const r = 32;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);

  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} fill="none" stroke="#E8E4DC" strokeWidth="7" />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[#333333]">
          {icon ? <span className="text-[#7DB87D]">{icon}</span> : null}
        </div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold leading-tight font-serif">
          {value}
          <span className="text-xs font-normal text-gray-500 ml-0.5">{unit}</span>
        </div>
        <div className="text-xs text-gray-500 mt-0.5">{label}</div>
      </div>
    </div>
  );
}
