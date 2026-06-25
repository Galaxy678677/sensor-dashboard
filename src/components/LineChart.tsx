import { useMemo } from 'react';

interface LineChartProps {
  data: { label: string; value: number }[];
  color?: string;
  unit?: string;
  height?: number;
  showArea?: boolean;
}

export function LineChart({ data, color = '#7DB87D', unit = '', height = 160, showArea = true }: LineChartProps) {
  const { path, area, max, min, ticks } = useMemo(() => {
    if (data.length === 0) return { path: '', area: '', max: 0, min: 0, ticks: [] as number[] };
    const values = data.map((d) => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const pad = (max - min) * 0.1 || 1;
    const yMax = max + pad;
    const yMin = Math.max(0, min - pad);

    const w = 600;
    const h = 200;
    const xStep = w / (data.length - 1 || 1);

    const points = data.map((d, i) => {
      const x = i * xStep;
      const y = h - ((d.value - yMin) / (yMax - yMin)) * h;
      return { x, y };
    });

    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const area = `${path} L ${w} ${h} L 0 ${h} Z`;

    return { path, area, max, min, ticks: [yMin, (yMin + yMax) / 2, yMax] };
  }, [data]);

  if (data.length === 0) return null;

  return (
    <div className="relative" style={{ height }}>
      <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        {showArea && <path d={area} fill={color} opacity={0.12} />}
        <path d={path} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => {
          const x = (i / (data.length - 1 || 1)) * 600;
          const y = 200 - ((d.value - ticks[0]) / (ticks[2] - ticks[0] || 1)) * 200;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={3} fill={color} stroke="white" strokeWidth={1.5} />
              <title>{`${d.label}: ${d.value}${unit}`}</title>
            </g>
          );
        })}
      </svg>
      <div className="absolute right-0 top-0 text-[10px] text-gray-400 text-right leading-tight">
        {max !== undefined && <div>最高 {max}{unit}</div>}
        {min !== undefined && <div>最低 {min}{unit}</div>}
      </div>
    </div>
  );
}
