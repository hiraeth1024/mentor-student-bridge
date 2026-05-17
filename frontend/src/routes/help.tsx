import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";

export const Route = createFileRoute("/help")({
  component: () => (
    <PageShell title="Help · 帮助中心">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-12 text-center">
        <p className="text-lg font-semibold">Help 模块开发中</p>
        <p className="mt-2 text-sm text-muted-foreground">使用说明、常见问题与支持联系方式</p>
      </div>
    </PageShell>
  ),
});
