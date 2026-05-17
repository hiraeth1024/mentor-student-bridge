import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";

export const Route = createFileRoute("/cover")({
  component: () => (
    <PageShell title="Cover · 邮件通知">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-12 text-center">
        <p className="text-lg font-semibold">Cover 模块开发中</p>
        <p className="mt-2 text-sm text-muted-foreground">邮件模板与邮件发送日志</p>
      </div>
    </PageShell>
  ),
});
