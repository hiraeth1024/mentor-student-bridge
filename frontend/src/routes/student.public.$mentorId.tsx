import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ChevronLeft,
  Eye,
  Mail,
  Globe,
  Inbox,
  IdCard,
  Network,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/home/PageShell";
import { MentorPostPreview } from "@/components/create/MentorPostPreview";
import { getMentorById, type MentorPublicItem } from "@/lib/mock/mentors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student/public/$mentorId")({
  loader: ({ params }) => {
    const mentor = getMentorById(params.mentorId);
    if (!mentor) throw notFound();
    return mentor;
  },
  component: MentorDetailPage,
  notFoundComponent: () => (
    <PageShell title="Public · 导师详情">
      <div className="mx-auto max-w-md rounded-2xl border bg-card p-10 text-center">
        <p className="text-sm">未找到该导师</p>
        <Button asChild variant="link" className="mt-2">
          <Link to="/student/public">返回导师列表</Link>
        </Button>
      </div>
    </PageShell>
  ),
});

function highestDegree(educations: { degree: string }[]): string | null {
  const order = ["博士", "硕士", "学士", "本科"];
  for (const d of order) {
    if (educations.some((e) => e.degree?.includes(d))) return d;
  }
  return null;
}

function MentorDetailPage() {
  const m = Route.useLoaderData() as MentorPublicItem;
  const p = m.info.profile;
  const degree = highestDegree(m.info.educations);

  return (
    <PageShell title="Public · 导师详情">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link to="/student/public" aria-label="返回">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">返回导师列表</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <HeroCard m={m} degree={degree} />
            <ContentTabs m={m} />
          </div>

          <aside className="lg:sticky lg:top-16 lg:self-start">
            <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              招生信息
            </div>
            {m.post ? (
              <MentorPostPreview data={m.post} />
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed bg-card/50 p-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Inbox className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">该导师暂未发布招生信息</p>
                <p className="text-xs text-muted-foreground">
                  你可以通过邮箱主动联系导师了解招生计划。
                </p>
                <Button asChild variant="outline" size="sm">
                  <a href={`mailto:${p.email}`}>
                    <Mail className="h-3.5 w-3.5" />
                    发邮件咨询
                  </a>
                </Button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </PageShell>
  );
}

/* ---------- Hero ---------- */

function HeroCard({ m, degree }: { m: MentorPublicItem; degree: string | null }) {
  const p = m.info.profile;
  const mentorTypesLine = m.info.mentorTypes.join(" | ");
  const subject = m.info.directions[0];
  const post = m.info.titles[0];

  const row1: InfoItem[] = [];
  if (subject) row1.push({ label: "学科", value: subject });
  if (post) row1.push({ label: "职务", value: post });

  const row2: InfoItem[] = [];
  if (m.info.mentorTypes.length > 0)
    row2.push({ label: "导师类别", value: m.info.mentorTypes.join("、") });
  if (m.alumni) row2.push({ label: "毕业院校", value: m.alumni });

  const row3: InfoItem[] = [];
  if (p.email)
    row3.push({
      label: "邮箱",
      value: p.email,
      href: `mailto:${p.email}`,
    });
  if (p.homepage)
    row3.push({
      label: "个人主页",
      value: p.homepage.replace(/^https?:\/\//, ""),
      href: p.homepage,
      external: true,
    });

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="h-2 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30" />
      <div className="flex flex-col gap-6 px-6 py-6 sm:flex-row">
        <img
          src={m.avatar}
          alt={p.fullName}
          width={160}
          height={200}
          className="h-44 w-36 shrink-0 self-center rounded-md object-cover shadow-md ring-1 ring-border sm:self-start"
        />
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-primary">
              {p.fullName}
            </h1>
            {degree && (
              <span className="rounded-full bg-muted px-3 py-0.5 text-xs font-medium text-muted-foreground">
                {degree}
              </span>
            )}
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              {p.title && <span>{p.title}</span>}
              {p.title && mentorTypesLine && (
                <span className="text-muted-foreground">|</span>
              )}
              {mentorTypesLine && <span>{mentorTypesLine}</span>}
            </div>
            <span
              className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground"
              title="访问量"
            >
              <Eye className="h-3.5 w-3.5" /> {m.views} 次访问
            </span>
          </div>

          <div className="space-y-2 border-t pt-3">
            <InfoRow icon={<IdCard className="h-4 w-4 text-primary" />} items={row1} />
            <InfoRow icon={<Network className="h-4 w-4 text-primary" />} items={row2} />
            <InfoRow icon={<Mail className="h-4 w-4 text-primary" />} items={row3} />
          </div>
        </div>
      </div>
    </div>
  );
}

type InfoItem = { label: string; value: string; href?: string; external?: boolean };

function InfoRow({ icon, items }: { icon: React.ReactNode; items: InfoItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {items.map((it, i) => (
          <span key={it.label} className="inline-flex items-center gap-2">
            {i > 0 && <span className="text-muted-foreground/60">|</span>}
            <span className="text-muted-foreground">{it.label}：</span>
            {it.href ? (
              <a
                href={it.href}
                target={it.external ? "_blank" : undefined}
                rel={it.external ? "noreferrer" : undefined}
                className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary hover:underline"
              >
                {it.value}
                {it.external && <Globe className="h-3 w-3" />}
              </a>
            ) : (
              <span className="font-medium text-foreground">{it.value}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Tabs ---------- */

type TabKey = "bio" | "courses" | "research";

function ContentTabs({ m }: { m: MentorPublicItem }) {
  const hasBio =
    !!m.info.bio ||
    m.info.directions.length > 0 ||
    m.info.educations.length > 0 ||
    m.info.workExperiences.length > 0 ||
    m.info.honors.length > 0;
  const hasCourses =
    m.info.courses.undergraduate.length > 0 || m.info.courses.graduate.length > 0;
  const hasResearch =
    m.info.papers.length > 0 ||
    m.info.vertical.length > 0 ||
    m.info.horizontal.length > 0 ||
    m.info.patents.length > 0;

  const tabs: { key: TabKey; label: string; show: boolean }[] = [
    { key: "bio", label: "个人简介", show: hasBio },
    { key: "courses", label: "开授课程", show: hasCourses },
    { key: "research", label: "科研成果", show: hasResearch },
  ];
  const visible = tabs.filter((t) => t.show);
  const [active, setActive] = useState<TabKey>(visible[0]?.key ?? "bio");

  if (visible.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex border-b bg-muted/30">
        {visible.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onMouseEnter={() => setActive(t.key)}
              onFocus={() => setActive(t.key)}
              onClick={() => setActive(t.key)}
              className={cn(
                "relative px-6 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-card text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
              {isActive && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      <div className="px-6 py-6">
        {active === "bio" && <BioTab m={m} />}
        {active === "courses" && <CoursesTab m={m} />}
        {active === "research" && <ResearchTab m={m} />}
      </div>
    </div>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <span className="h-4 w-1 rounded bg-primary" />
        {title}
      </h3>
      <div className="space-y-3 pl-3">{children}</div>
    </section>
  );
}

function BioTab({ m }: { m: MentorPublicItem }) {
  return (
    <div className="space-y-6">
      {m.info.bio && (
        <SubSection title="个人简介">
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">
            {m.info.bio}
          </p>
        </SubSection>
      )}
      {m.info.directions.length > 0 && (
        <SubSection title="研究方向">
          <div className="flex flex-wrap gap-1.5">
            {m.info.directions.map((d) => (
              <span
                key={d}
                className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium"
              >
                {d}
              </span>
            ))}
          </div>
        </SubSection>
      )}
      {m.info.educations.length > 0 && (
        <SubSection title="教育经历">
          {m.info.educations.map((e) => (
            <Entry
              key={e.id}
              title={e.school || "学校"}
              meta={[e.degree, e.major].filter(Boolean).join(" · ")}
              right={e.period}
            />
          ))}
        </SubSection>
      )}
      {m.info.workExperiences.length > 0 && (
        <SubSection title="工作经历">
          {m.info.workExperiences.map((w) => (
            <Entry
              key={w.id}
              title={w.organization || "单位"}
              meta={w.position}
              right={w.period}
            />
          ))}
        </SubSection>
      )}
      {m.info.honors.length > 0 && (
        <SubSection title="荣誉及奖励">
          {m.info.honors.map((h) => (
            <Entry key={h.id} title={h.name} meta={h.issuer} right={h.year} />
          ))}
        </SubSection>
      )}
    </div>
  );
}

function CoursesTab({ m }: { m: MentorPublicItem }) {
  return (
    <div className="space-y-6">
      {m.info.courses.graduate.length > 0 && (
        <SubSection title="研究生课程">
          <CourseList items={m.info.courses.graduate} />
        </SubSection>
      )}
      {m.info.courses.undergraduate.length > 0 && (
        <SubSection title="本科生课程">
          <CourseList items={m.info.courses.undergraduate} />
        </SubSection>
      )}
    </div>
  );
}

function CourseList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((c) => (
        <span
          key={c}
          className="inline-flex items-center gap-1.5 rounded-md border bg-muted/40 px-3 py-1.5 text-xs font-medium"
        >
          <BookOpen className="h-3 w-3 text-primary" />
          {c}
        </span>
      ))}
    </div>
  );
}

function ResearchTab({ m }: { m: MentorPublicItem }) {
  return (
    <div className="space-y-6">
      {m.info.papers.length > 0 && (
        <SubSection title="发表论文">
          {m.info.papers.map((pp) => (
            <div key={pp.id} className="text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-medium">
                  {pp.url ? (
                    <a
                      href={pp.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:text-primary hover:underline"
                    >
                      {pp.title}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    pp.title
                  )}
                </p>
                {pp.publishedAt && (
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {pp.publishedAt}
                  </span>
                )}
              </div>
            </div>
          ))}
        </SubSection>
      )}
      {m.info.vertical.length > 0 && (
        <SubSection title="纵向科研">
          {m.info.vertical.map((v) => (
            <Entry
              key={v.id}
              title={v.name || "项目"}
              meta={[v.source, v.code, v.role].filter(Boolean).join(" · ")}
              right={v.period}
              body={v.description}
            />
          ))}
        </SubSection>
      )}
      {m.info.horizontal.length > 0 && (
        <SubSection title="横向科研">
          {m.info.horizontal.map((h) => (
            <Entry
              key={h.id}
              title={h.name || "项目"}
              meta={[h.client, h.budget].filter(Boolean).join(" · ")}
              right={h.period}
              body={h.description}
            />
          ))}
        </SubSection>
      )}
      {m.info.patents.length > 0 && (
        <SubSection title="专利">
          {m.info.patents.map((pt) => (
            <Entry
              key={pt.id}
              title={pt.name || "专利"}
              meta={pt.patentNo}
              right={pt.grantedAt}
            />
          ))}
        </SubSection>
      )}
    </div>
  );
}

function Entry({
  title,
  meta,
  right,
  body,
}: {
  title: string;
  meta?: string;
  right?: string;
  body?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold">{title}</p>
        {right && <span className="shrink-0 text-xs text-muted-foreground">{right}</span>}
      </div>
      {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
      {body && (
        <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-foreground/80">
          {body}
        </p>
      )}
    </div>
  );
}
