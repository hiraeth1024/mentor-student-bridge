import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionCard } from "@/components/create/SectionCard";

export const Route = createFileRoute("/student/create/aspiration")({
  head: () => ({
    meta: [
      { title: "创建志愿 — 研究生导师双选系统" },
      { name: "description", content: "填报导师志愿，按优先级排序你的双选意向。" },
      { property: "og:title", content: "创建志愿 — 研究生导师双选系统" },
      {
        property: "og:description",
        content: "填报导师志愿，按优先级排序你的双选意向。",
      },
    ],
  }),
  component: AspirationPage,
});

function AspirationPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="rounded-2xl border bg-accent/40 px-5 py-4 text-sm text-accent-foreground">
        建议先在
        <span className="mx-1 font-medium">Resume</span>
        中完善简历信息，再来填报志愿，导师会更容易识别你的研究方向匹配度。
      </div>

      <SectionCard title="第一志愿" description="最希望加入的导师方向">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="导师">
            <Input placeholder="如：李志远 教授" />
          </Field>
          <Field label="研究方向">
            <Input placeholder="如：可解释机器学习" />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="第二志愿" description="备选导师方向">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="导师">
            <Input />
          </Field>
          <Field label="研究方向">
            <Input />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="个人陈述" description="向导师介绍你的研究兴趣与匹配点">
        <Textarea rows={5} placeholder="200–500 字，说明你的研究兴趣、相关基础与匹配点…" />
      </SectionCard>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => toast("已保存草稿（Demo）")}>
          保存草稿
        </Button>
        <Button onClick={() => toast("志愿已提交（Demo）", { description: "正式版本将进入审核流程。" })}>
          提交志愿
        </Button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
