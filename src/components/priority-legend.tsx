import { PRIORITY_MAP } from "@/lib/priority";

export default function PriorityLegend() {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
      <span className="font-semibold">Legende:</span>
      {Object.entries(PRIORITY_MAP).map(([priority, { label, icon }]) => {
        if (!icon) return null;
        return (
          <div key={priority} className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/80 text-destructive-foreground p-1 backdrop-blur-sm">
              {icon}
            </span>
            <span className="text-xs">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
