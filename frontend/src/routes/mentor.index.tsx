import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { WelcomeHero } from "@/components/home/WelcomeHero";
import { QuickActionsGrid } from "@/components/home/QuickActions";
import { TodoList } from "@/components/home/TodoList";
import { SectionHeader } from "@/components/home/SectionHeader";
import { StatusPanel } from "@/components/home/StatusPanel";
import { NotificationsPanel } from "@/components/home/NotificationsPanel";
import { mentorHomeMock as m } from "@/lib/mock/mentor";

export const Route = createFileRoute("/mentor/")({
  head: () => ({
    meta: [
      { title: "导师工作台 — 研究生导师双选系统" },
      { name: "description", content: "导师端首页：招生发布、申请审核、面试安排与录取处理。" },
      { property: "og:title", content: "导师工作台 — 研究生导师双选系统" },
      { property: "og:description", content: "导师端首页：招生发布、申请审核、面试安排与录取处理。" },
    ],
  }),
  component: MentorHome,
});

function MentorHome() {
  const e = m.enrollment;
  return (
    <PageShell title="Home · 导师工作台">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <WelcomeHero greeting={m.greeting} subtitle={m.subtitle} batch={m.batch} />

          <section>
            <SectionHeader title="开始办理" />
            <QuickActionsGrid actions={m.quickActions} />
          </section>

          <section>
            <SectionHeader title="待处理申请" action="查看全部申请" />
            <TodoList items={m.todos} />
          </section>

          <section>
            <SectionHeader title="招生概览" action="查看招生方向" />
            <div className="grid grid-cols-2 gap-3 rounded-2xl border bg-card p-5 sm:grid-cols-5">
              {[
                { l: "招生方向", v: e.directions },
                { l: "总招生名额", v: e.totalQuota },
                { l: "已录取", v: e.accepted },
                { l: "剩余名额", v: e.remaining },
                { l: "当前轮次", v: e.round },
              ].map((it) => (
                <div key={it.l} className="text-center">
                  <p className="text-xs text-muted-foreground">{it.l}</p>
                  <p className="mt-1 text-lg font-semibold tracking-tight">{it.v}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="学生沟通" action="进入沟通中心" />
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
