import { ArrowRight } from "lucide-react";

export function SectionHeader({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
      {action ? (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          {action}
          <ArrowRight className="h-3 w-3" />
        </button>
      ) : null}
    </div>
  );
}
