import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";

export const Route = createFileRoute("/public")({
  component: () => (
    <PageShell title="Public · 公开信息">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-12 text-center">
        <p className="text-lg font-semibold">Public 模块开发中</p>
        <p className="mt-2 text-sm text-muted-foreground">公开导师信息 / 查看学生信息</p>
      </div>
    </PageShell>
  ),
});
