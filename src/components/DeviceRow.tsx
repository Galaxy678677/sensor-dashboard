import { Blinds, Droplets, SprayCanIcon, Lightbulb, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DeviceState } from '@/types';
import { ToggleSwitch } from './ToggleSwitch';

const iconMap: Record<string, typeof Blinds> = {
  Blinds,
  Droplets,
  SprayCanIcon,
  Lightbulb,
  RotateCw,
};

interface DeviceRowProps {
  device: DeviceState;
  onToggle: () => void;
}

export function DeviceRow({ device, onToggle }: DeviceRowProps) {
  const Icon = iconMap[device.icon] || Blinds;
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F0E8]/60 hover:bg-[#F5F0E8] transition-colors">
      <div className="flex items-center gap-3">
        <div className={cn('w-9 h-9 rounded-full flex items-center justify-center', device.on ? 'bg-[#7DB87D] text-white' : 'bg-gray-200 text-gray-500')}>
          <Icon size={16} />
        </div>
        <div>
          <div className="text-sm font-medium text-[#333333]">{device.name}</div>
          <div className="text-xs text-gray-500">
            {device.auto ? '自动模式' : device.on ? '已开启' : '已关闭'}
          </div>
        </div>
      </div>
      <ToggleSwitch checked={device.on} onChange={onToggle} size="sm" />
    </div>
  );
}
