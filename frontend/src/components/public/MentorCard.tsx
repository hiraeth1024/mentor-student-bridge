import { Link } from "@tanstack/react-router";
import { ChevronRight, Eye, GraduationCap, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { MentorPublicItem } from "@/lib/mock/mentors";

export function MentorCard({ m }: { m: MentorPublicItem }) {
  const recruiting = !!m.post;
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between px-4 pt-4">
        <Badge
          variant="secondary"
          className={
            recruiting
              ? "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/15 dark:text-emerald-300"
              : "bg-muted text-muted-foreground hover:bg-muted"
          }
        >
          <span
            className={
              "mr-1.5 inline-block h-1.5 w-1.5 rounded-full " +
              (recruiting ? "bg-emerald-500" : "bg-muted-foreground/50")
            }
          />
          {recruiting ? "招生中" : "暂未发布"}
        </Badge>
      </div>

      <div className="flex flex-col items-center px-4 pb-4 pt-2">
        <img
          src={m.avatar}
          alt={m.info.profile.fullName}
          width={96}
          height={96}
          loading="lazy"
          className="h-24 w-24 rounded-full object-cover ring-2 ring-background"
        />
        <h3 className="mt-3 text-base font-semibold">{m.info.profile.fullName}</h3>
        <p className="text-xs text-muted-foreground">{m.info.profile.title}</p>
      </div>

      <div className="mx-4 space-y-2 rounded-xl bg-muted/40 p-3 text-xs">
        <Row icon={<GraduationCap className="h-3.5 w-3.5" />} text={m.alumni} />
        <Row icon={<Mail className="h-3.5 w-3.5" />} text={m.info.profile.email} />
        <div className="flex flex-wrap gap-1 pt-0.5">
          {m.info.directions.slice(0, 3).map((d) => (
            <span
              key={d}
              className="rounded-full bg-background px-2 py-0.5 text-[10px] font-medium text-foreground/80"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t px-4 py-3 text-xs">
        <span className="inline-flex items-center gap-3 text-muted-foreground">
          <span className="truncate">{m.info.profile.college}</span>
          <span className="inline-flex items-center gap-1 shrink-0" title="访问量">
            <Eye className="h-3.5 w-3.5" />
            {m.views}
          </span>
        </span>
        <Link
          to="/student/public/$mentorId"
          params={{ mentorId: m.id }}
          className="inline-flex items-center gap-0.5 font-medium text-primary hover:underline"
        >
          View details
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5 text-foreground/80">
      <span className="text-muted-foreground">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );
}
