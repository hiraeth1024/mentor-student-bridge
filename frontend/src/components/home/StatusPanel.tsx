import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import type { StatusBlockData } from "@/lib/mock/types";

export function StatusPanel({ blocks, title = "当前状态" }: { blocks: StatusBlockData[]; title?: string }) {
  return (
    <aside className="sticky top-4 space-y-3">
      <div className="rounded-2xl border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">业务驾驶舱·实时同步</p>
      </div>
      {blocks.map((b, i) => (
        <div key={i} className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{b.title}</span>
            {b.status ? <StatusBadge status={b.status} /> : null}
          </div>
          <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">{b.value}</p>
          {b.hint ? <p className="mt-1 text-xs text-muted-foreground">{b.hint}</p> : null}
          {b.ctaLabel ? (
            <Button size="sm" variant="secondary" className="mt-3 w-full">
              {b.ctaLabel}
            </Button>
          ) : null}
        </div>
      ))}
    </aside>
  );
}
