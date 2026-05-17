import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, Download } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/home/PageShell";
import { CreateTabs } from "@/components/create/CreateTabs";
import { Button } from "@/components/ui/button";
import { useRole } from "@/lib/useRole";

export function CreateLayout() {
  const role = useRole();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const backHref = role === "mentor" ? "/mentor" : "/student";
  const isPost = path.endsWith("/create/post");
  const exportLabel = isPost ? "预览发布" : "Export PDF";

  return (
    <PageShell title="Create · 创建">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon">
              <Link to={backHref} aria-label="返回">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
            <CreateTabs />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast(`${exportLabel}功能即将上线`, {
                description: "Demo 版本暂未接入真实功能，敬请期待。",
              })
            }
          >
            <Download className="h-4 w-4" />
            {exportLabel}
          </Button>
        </div>

        <Outlet />
      </div>
    </PageShell>
  );
}
