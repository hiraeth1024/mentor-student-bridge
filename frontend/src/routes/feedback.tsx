import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";

export const Route = createFileRoute("/feedback")({
  component: () => (
    <PageShell title="Feedback · 沟通反馈">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-12 text-center">
        <p className="text-lg font-semibold">Feedback 模块开发中</p>
        <p className="mt-2 text-sm text-muted-foreground">双向沟通消息系统</p>
      </div>
    </PageShell>
  ),
});
