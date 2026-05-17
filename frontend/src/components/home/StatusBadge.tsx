import { cn } from "@/lib/utils";
import type { StatusKind } from "@/lib/mock/types";

const labelMap: Record<StatusKind, string> = {
  "not-started": "未开始",
  "in-progress": "进行中",
  incomplete: "待完善",
  "to-submit": "待提交",
  "to-review": "待审核",
  "to-interview": "待面试",
  "to-confirm": "待确认",
  accepted: "已录取",
  rejected: "未录取",
  completed: "已完成",
};

const colorMap: Record<StatusKind, string> = {
  "not-started": "bg-muted text-muted-foreground",
  "in-progress": "bg-status-progress/10 text-status-progress",
  incomplete: "bg-status-warning/15 text-status-warning",
  "to-submit": "bg-status-warning/15 text-status-warning",
  "to-review": "bg-status-progress/10 text-status-progress",
  "to-interview": "bg-status-progress/10 text-status-progress",
  "to-confirm": "bg-status-warning/15 text-status-warning",
  accepted: "bg-status-success/15 text-status-success",
  rejected: "bg-status-danger/15 text-status-danger",
  completed: "bg-status-success/15 text-status-success",
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: StatusKind;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        colorMap[status],
        className,
      )}
    >
      {label ?? labelMap[status]}
    </span>
  );
}
