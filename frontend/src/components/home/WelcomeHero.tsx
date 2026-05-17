import { CalendarClock } from "lucide-react";
import type { BatchInfo } from "@/lib/mock/types";

export function WelcomeHero({
  greeting,
  subtitle,
  batch,
}: {
  greeting: string;
  subtitle: string;
  batch: BatchInfo;
}) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{greeting}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid gap-1 rounded-xl bg-muted/60 px-4 py-3 text-sm md:min-w-[260px]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">当前批次</span>
            <span className="font-medium text-foreground">{batch.name}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">当前阶段</span>
            <span className="font-medium text-foreground">{batch.stageLabel}</span>
          </div>
          {batch.deadline ? (
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarClock className="h-3.5 w-3.5" />
              {batch.deadline}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
