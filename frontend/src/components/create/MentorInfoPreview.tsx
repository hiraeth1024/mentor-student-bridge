import { ExternalLink } from "lucide-react";
import type { MentorInfoData } from "@/lib/mock/mentorCreate";

export function MentorInfoPreview({ data }: { data: MentorInfoData }) {
  const p = data.profile;

  const hasResearch =
    data.papers.length > 0 ||
    data.vertical.length > 0 ||
    data.horizontal.length > 0 ||
    data.patents.length > 0;

  const hasCourses =
    data.courses.undergraduate.length > 0 || data.courses.graduate.length > 0;

  return (
    <div className="mx-auto max-w-2xl space-y-7 rounded-2xl border bg-card px-10 py-12 shadow-sm">
      <header className="space-y-2 border-b pb-5">
        <h1 className="text-3xl font-bold tracking-tight">{p.fullName || "导师姓名"}</h1>
        {p.title && <p className="text-sm text-primary">{p.title}</p>}
        {data.titles.length > 0 && (
          <ul className="space-y-0.5 text-xs text-foreground/80">
            {data.titles.map((t) => (
              <li key={t}>· {t}</li>
            ))}
          </ul>
        )}
        <p className="text-xs text-muted-foreground">
          {[p.college, p.email, p.homepage].filter(Boolean).join(" · ")}
        </p>
        {data.mentorTypes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {data.mentorTypes.map((t) => (
              <span
                key={t}
                className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      {data.directions.length > 0 && (
        <Section title="研究方向">
          <div className="flex flex-wrap gap-1.5">
            {data.directions.map((d) => (
              <span
                key={d}
                className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium"
              >
                {d}
              </span>
            ))}
          </div>
        </Section>
      )}

      {data.educations.length > 0 && (
        <Section title="教育背景">
          {data.educations.map((e) => (
            <Entry
              key={e.id}
              title={e.school || "学校"}
              meta={[e.degree, e.major].filter(Boolean).join(" · ")}
              right={e.period}
            />
          ))}
        </Section>
      )}

      {data.workExperiences.length > 0 && (
        <Section title="工作经历">
          {data.workExperiences.map((w) => (
            <Entry
              key={w.id}
              title={w.organization || "单位"}
              meta={w.position}
              right={w.period}
            />
          ))}
        </Section>
      )}

      {hasResearch && (
        <Section title="科研成果">
          {data.papers.length > 0 && (
            <SubGroup title="发表论文">
              {data.papers.map((p) => (
                <div key={p.id} className="text-sm">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-medium">
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 hover:text-primary hover:underline"
                        >
                          {p.title}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        p.title
                      )}
                    </p>
                    {p.publishedAt && (
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {p.publishedAt}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </SubGroup>
          )}

          {data.vertical.length > 0 && (
            <SubGroup title="纵向科研">
              {data.vertical.map((v) => (
                <Entry
                  key={v.id}
                  title={v.name || "项目"}
                  meta={[v.source, v.code, v.role].filter(Boolean).join(" · ")}
                  right={v.period}
                  body={v.description}
                />
              ))}
            </SubGroup>
          )}

          {data.horizontal.length > 0 && (
            <SubGroup title="横向科研">
              {data.horizontal.map((h) => (
                <Entry
                  key={h.id}
                  title={h.name || "项目"}
                  meta={[h.client, h.budget].filter(Boolean).join(" · ")}
                  right={h.period}
                  body={h.description}
                />
              ))}
            </SubGroup>
          )}

          {data.patents.length > 0 && (
            <SubGroup title="专利">
              {data.patents.map((pt) => (
                <Entry
                  key={pt.id}
                  title={pt.name || "专利"}
                  meta={pt.patentNo}
                  right={pt.grantedAt}
                />
              ))}
            </SubGroup>
          )}
        </Section>
      )}

      {hasCourses && (
        <Section title="开授课程">
          {data.courses.undergraduate.length > 0 && (
            <CourseLine label="本科课程" items={data.courses.undergraduate} />
          )}
          {data.courses.graduate.length > 0 && (
            <CourseLine label="研究生课程" items={data.courses.graduate} />
          )}
        </Section>
      )}

      {data.honors.length > 0 && (
        <Section title="荣誉及奖励">
          {data.honors.map((h) => (
            <Entry
              key={h.id}
              title={h.name}
              meta={h.issuer}
              right={h.year}
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
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function SubGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-[11px] font-semibold tracking-wider text-foreground/70">
        {title}
      </h3>
      <div className="space-y-3 border-l-2 border-border pl-3">{children}</div>
    </div>
  );
}

function CourseLine({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className="text-xs font-medium text-foreground/70">{label}：</span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((c) => (
          <span
            key={c}
            className="rounded-md bg-muted px-2 py-0.5 text-xs"
          >
            {c}
          </span>
        ))}
      </div>
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
