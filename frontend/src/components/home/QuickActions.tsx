import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QuickAction } from "@/lib/mock/types";

function Icon({ name, className }: { name: string; className?: string }) {
  const Comp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ?? Icons.Sparkles;
  return <Comp className={className} />;
}

export function QuickActionCard({ action }: { action: QuickAction }) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-3 rounded-2xl border bg-card p-5 transition-all",
        "hover:border-primary/40 hover:shadow-[0_8px_24px_-12px_rgba(59,130,246,0.25)]",
        action.disabled && "opacity-60",
        action.highlight && "border-primary/50 ring-1 ring-primary/20",
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            action.highlight ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground",
          )}
        >
          <Icon name={action.icon} className="h-5 w-5" />
        </div>
        {action.highlight ? (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            建议优先
          </span>
        ) : null}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">{action.title}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{action.description}</p>
      </div>
      <Button
        size="sm"
        variant={action.highlight ? "default" : "secondary"}
        disabled={action.disabled}
        className="mt-1 w-fit"
      >
        {action.cta}
      </Button>
    </div>
  );
}

export function QuickActionsGrid({ actions }: { actions: QuickAction[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map((a) => (
        <QuickActionCard key={a.id} action={a} />
      ))}
    </div>
  );
}
