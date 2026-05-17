import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useRole } from "@/lib/useRole";

const studentTabs = [
  { to: "/student/create/resume", label: "Resume · 简历" },
  { to: "/student/create/aspiration", label: "Aspiration · 志愿" },
] as const;

const mentorTabs = [
  { to: "/mentor/create/info", label: "Info · 导师信息" },
  { to: "/mentor/create/post", label: "Post · 发布招生" },
] as const;

export function CreateTabs() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const role = useRole();
  const tabs = role === "mentor" ? mentorTabs : studentTabs;
  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-muted p-1">
      {tabs.map((t) => {
        const active = path.startsWith(t.to);
        return (
          <Link
            key={t.to}
            to={t.to}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              active
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
