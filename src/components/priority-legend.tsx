import { Flame, Star } from 'lucide-react';

export default function PriorityLegend() {
  const legendItems = [
    {
      label: 'Top-Event',
      Icon: Flame,
      iconClassName: 'h-5 w-5 text-primary-foreground',
      bgClassName: 'bg-primary/90'
    },
    {
      label: 'Empfohlen',
      Icon: Star,
      iconClassName: 'h-5 w-5 text-white',
      bgClassName: 'bg-yellow-400/90'
    }
  ];

  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
      <span className="font-semibold">Legende:</span>
      {legendItems.map(({ label, Icon, iconClassName, bgClassName }) => (
        <div key={label} className="flex items-center gap-1.5">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm ${bgClassName}`}>
            <Icon className={iconClassName} />
          </div>
          <span className="text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}
