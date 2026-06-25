import { cn } from '@/lib/utils';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  size?: 'sm' | 'md';
  activeColor?: string;
}

export function ToggleSwitch({ checked, onChange, size = 'md', activeColor = '#7DB87D' }: ToggleSwitchProps) {
  const isSm = size === 'sm';
  const trackW = isSm ? 40 : 48;
  const trackH = isSm ? 22 : 26;
  const thumb = isSm ? 18 : 22;
  const padding = 2;
  const translate = trackW - thumb - padding * 2;

  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn('relative rounded-full transition-colors duration-300 focus:outline-none flex-shrink-0')}
      style={{
        width: trackW,
        height: trackH,
        backgroundColor: checked ? activeColor : '#D1D5DB',
      }}
      aria-pressed={checked}
    >
      <span
        className="absolute top-1/2 -translate-y-1/2 bg-white rounded-full shadow transition-transform duration-300"
        style={{
          width: thumb,
          height: thumb,
          left: padding,
          transform: `translate(${checked ? translate : 0}px, -50%)`,
        }}
      />
    </button>
  );
}
