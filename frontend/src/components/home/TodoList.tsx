import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TodoItem } from "@/lib/mock/types";

const dotColor = {
  high: "bg-status-danger",
  medium: "bg-status-warning",
  low: "bg-status-progress",
};

export function TodoList({ items }: { items: TodoItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center">
        <p className="text-sm font-medium text-foreground">当前暂无待处理事项</p>
        <p className="mt-1 text-xs text-muted-foreground">系统将在关键节点提醒你下一步操作。</p>
      </div>
    );
  }
  return (
    <ul className="divide-y rounded-2xl border bg-card">
      {items.slice(0, 5).map((t) => (
        <li key={t.id} className="flex items-center gap-3 px-4 py-3">
          <span className={cn("h-2 w-2 shrink-0 rounded-full", dotColor[t.priority])} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-foreground">{t.text}</p>
            {t.time ? <p className="mt-0.5 text-xs text-muted-foreground">{t.time}</p> : null}
          </div>
          <Button size="sm" variant="ghost" className="text-primary hover:text-primary">
            {t.cta}
          </Button>
        </li>
      ))}
    </ul>
  );
}
