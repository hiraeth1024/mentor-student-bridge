import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { WelcomeHero } from "@/components/home/WelcomeHero";
import { QuickActionsGrid } from "@/components/home/QuickActions";
import { TodoList } from "@/components/home/TodoList";
import { SectionHeader } from "@/components/home/SectionHeader";
import { StatusPanel } from "@/components/home/StatusPanel";
import { NotificationsPanel } from "@/components/home/NotificationsPanel";
import { StatusBadge } from "@/components/home/StatusBadge";
import { Button } from "@/components/ui/button";
import { studentHomeMock as m } from "@/lib/mock/student";

export const Route = createFileRoute("/student/")({
  head: () => ({
    meta: [
      { title: "学生工作台 — 研究生导师双选系统" },
      { name: "description", content: "学生端首页：志愿填报、录取进度、导师沟通一站式入口。" },
      { property: "og:title", content: "学生工作台 — 研究生导师双选系统" },
      { property: "og:description", content: "学生端首页：志愿填报、录取进度、导师沟通一站式入口。" },
    ],
  }),
  component: StudentHome,
});

function StudentHome() {
  return (
    <PageShell title="Home · 学生工作台">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <WelcomeHero greeting={m.greeting} subtitle={m.subtitle} batch={m.batch} />

          <section>
            <SectionHeader title="开始办理" />
            <QuickActionsGrid actions={m.quickActions} />
          </section>

          <section>
            <SectionHeader title="我的待办" action="查看全部" />
            <TodoList items={m.todos} />
          </section>

          <section>
            <SectionHeader title="我的双选进度" action="查看全部志愿" />
            {m.progress.submitted === 0 ? (
              <div className="rounded-2xl border bg-card p-8 text-center">
                <p className="text-sm font-medium">你还没有创建导师志愿</p>
                <p className="mt-1 text-xs text-muted-foreground">请先完善资料，再根据研究方向选择导师。</p>
                <Button size="sm" className="mt-4">去创建志愿</Button>
              </div>
            ) : (
              <div className="rounded-2xl border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">当前批次</span>
                    <span className="text-sm font-medium">{m.progress.round}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">已填报志愿</span>
                    <span className="text-sm font-medium">
                      {m.progress.submitted} / {m.progress.total}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">最终结果</span>
                    <span className="text-sm font-medium">
                      {m.progress.finalMentor ?? "暂未确定导师"}
                    </span>
                  </div>
                </div>
                <ul className="mt-3 space-y-2">
                  {m.progress.items.map((it) => (
                    <li
                      key={it.rank}
                      className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3"
                    >
                      <div>
                        <p className="text-xs text-muted-foreground">{it.rank}</p>
                        <p className="text-sm font-medium">{it.mentor}</p>
                      </div>
                      <StatusBadge status={it.status} label={it.statusLabel} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section>
            <SectionHeader title="最新通知" action="进入消息中心" />
            <NotificationsPanel system={m.notifications.system} chat={m.notifications.chat} />
          </section>
        </div>

        <div className="lg:col-span-4">
          <StatusPanel blocks={m.sidebarStatus} />
        </div>
      </div>
    </PageShell>
  );
}
