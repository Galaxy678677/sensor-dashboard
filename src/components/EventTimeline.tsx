import { Droplets, SprayCanIcon, Blinds, Lightbulb, AlertTriangle } from 'lucide-react';
import type { EventLog } from '@/types';
import { EVENT_TYPE_LABELS } from '@/types';

const icons: Record<EventLog['type'], typeof Droplets> = {
  water: Droplets,
  spray: SprayCanIcon,
  curtain: Blinds,
  led: Lightbulb,
  warning: AlertTriangle,
};

const colors: Record<EventLog['type'], string> = {
  water: 'bg-blue-100 text-blue-600',
  spray: 'bg-cyan-100 text-cyan-600',
  curtain: 'bg-amber-100 text-amber-600',
  led: 'bg-yellow-100 text-yellow-600',
  warning: 'bg-red-100 text-red-600',
};

export function EventTimeline({ events }: { events: EventLog[] }) {
  return (
    <div className="space-y-4">
      {events.map((e, idx) => {
        const Icon = icons[e.type];
        return (
          <div key={e.id} className="flex gap-3 group">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colors[e.type]} group-hover:scale-110 transition-transform`}>
                <Icon size={14} />
              </div>
              {idx < events.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 my-1" />}
            </div>
            <div className="pb-4">
              <div className="text-xs text-gray-400">{e.time}</div>
              <div className="text-sm font-medium text-[#333333]">
                {EVENT_TYPE_LABELS[e.type]} · {e.trigger}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{e.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
