import { CalendarDays, GraduationCap, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { MentorPostData } from "@/lib/mock/mentorCreate";

export function MentorPostPreview({ data }: { data: MentorPostData }) {
  return (
    <div className="mx-auto max-w-2xl space-y-6 rounded-2xl border bg-card px-10 py-10 shadow-sm">
      <header className="space-y-3 border-b pb-5">
        <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
          招生公告
        </span>
        <h1 className="text-2xl font-bold leading-snug tracking-tight">
          {data.title || "招生标题"}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <Meta icon={<GraduationCap className="h-3.5 w-3.5" />} text={data.degreeType} />
          {data.batch && <Meta icon={<MapPin className="h-3.5 w-3.5" />} text={data.batch} />}
          {data.quota && <Meta icon={<Users className="h-3.5 w-3.5" />} text={`招生 ${data.quota} 人`} />}
          {data.deadline && (
            <Meta icon={<CalendarDays className="h-3.5 w-3.5" />} text={`截止 ${data.deadline}`} />
          )}
        </div>
        {data.directions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {data.directions.map((d) => (
              <span
                key={d}
                className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium"
              >
                {d}
              </span>
            ))}
          </div>
        )}
      </header>

      {(data.majorRequirement || data.degreeRequirement) && (
        <Section title="专业要求">
          {data.majorRequirement && <P label="本科专业" value={data.majorRequirement} />}
          {data.degreeRequirement && <P label="学历要求" value={data.degreeRequirement} />}
        </Section>
      )}

      {data.abilityRequirements && (
        <Section title="能力要求">
          <Body text={data.abilityRequirements} />
        </Section>
      )}

      {data.bonus && (
        <Section title="加分项">
          <Body text={data.bonus} />
        </Section>
      )}

      {data.workContent && (
        <Section title="工作内容 / 课题描述">
          <Body text={data.workContent} />
        </Section>
      )}

      {(data.contact || data.remark) && (
        <Section title="联系方式与备注">
          {data.contact && <P label="联系方式" value={data.contact} />}
          {data.remark && <Body text={data.remark} />}
        </Section>
      )}

      <div className="border-t pt-5">
        <Button
          className="w-full"
          onClick={() =>
            toast("申请功能即将上线", {
              description: "Demo 版本暂未联通学生侧申请流程。",
            })
          }
        >
          申请此方向
        </Button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Meta({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {icon}
      {text}
    </span>
  );
}

function P({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm leading-relaxed">
      <span className="text-muted-foreground">{label}：</span>
      <span className="text-foreground/85">{value}</span>
    </p>
  );
}

function Body({ text }: { text: string }) {
  return (
    <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">{text}</p>
  );
}
