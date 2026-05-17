import { examStatusLabel, type ResumeData } from "@/lib/mock/resume";

export function ResumePreview({ data }: { data: ResumeData }) {
  const c = data.contact;
  const examFilled =
    data.exam.targetSchool || data.exam.targetMajor || data.exam.totalScore;

  return (
    <div className="mx-auto max-w-2xl space-y-7 rounded-2xl border bg-card px-10 py-12 shadow-sm">
      {/* Header */}
      <header className="space-y-2 border-b pb-5">
        <h1 className="text-3xl font-bold tracking-tight">
          {c.fullName || "你的姓名"}
        </h1>
        {c.title && <p className="text-sm text-primary">{c.title}</p>}
        <p className="text-xs text-muted-foreground">
          {[c.email, c.phone, c.location].filter(Boolean).join(" · ")}
        </p>
      </header>

      {data.summary && (
        <Section title="Summary">
          <p className="text-sm leading-relaxed text-foreground/80">{data.summary}</p>
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title="Education">
          {data.education.map((e) => (
            <Entry
              key={e.id}
              title={e.school || "学校"}
              meta={[e.degree, e.major].filter(Boolean).join(" · ")}
              right={[e.start, e.end].filter(Boolean).join(" – ")}
              extra={e.gpa ? `GPA: ${e.gpa}` : undefined}
            />
          ))}
        </Section>
      )}

      {examFilled && (
        <Section title="考研信息">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            {data.exam.targetSchool && (
              <Pair label="报考院校" value={data.exam.targetSchool} />
            )}
            {data.exam.targetMajor && (
              <Pair label="报考专业" value={data.exam.targetMajor} />
            )}
            {data.exam.totalScore && (
              <Pair label="初试总分" value={data.exam.totalScore} />
            )}
            <Pair label="复试状态" value={examStatusLabel[data.exam.status]} />
            {data.exam.political && <Pair label="政治" value={data.exam.political} />}
            {data.exam.english && <Pair label="英语" value={data.exam.english} />}
            {data.exam.math && <Pair label="数学" value={data.exam.math} />}
            {data.exam.major && <Pair label="专业课" value={data.exam.major} />}
          </div>
        </Section>
      )}

      {data.experience.length > 0 && (
        <Section title="Experience">
          {data.experience.map((e) => (
            <Entry
              key={e.id}
              title={e.org || "组织"}
              meta={e.role}
              right={[e.start, e.end].filter(Boolean).join(" – ")}
              body={e.description}
            />
          ))}
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title="Projects">
          {data.projects.map((p) => (
            <Entry
              key={p.id}
              title={p.name || "项目"}
              meta={p.role}
              right={p.stack}
              body={p.description}
            />
          ))}
        </Section>
      )}

      {data.research.length > 0 && (
        <Section title="Research">
          {data.research.map((r) => (
            <Entry
              key={r.id}
              title={r.title || "研究课题"}
              meta={r.role}
              right={r.period}
              body={r.description}
            />
          ))}
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Entry({
  title,
  meta,
  right,
  extra,
  body,
}: {
  title: string;
  meta?: string;
  right?: string;
  extra?: string;
  body?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold">{title}</p>
        {right && <span className="shrink-0 text-xs text-muted-foreground">{right}</span>}
      </div>
      {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
      {extra && <p className="mt-0.5 text-xs text-muted-foreground">{extra}</p>}
      {body && (
        <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-foreground/80">
          {body}
        </p>
      )}
    </div>
  );
}

function Pair({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-muted-foreground">{label}：</span>
      <span className="font-medium">{value}</span>
    </p>
  );
}
