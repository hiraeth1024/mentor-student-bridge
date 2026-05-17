import { Link } from "@tanstack/react-router";
import { ChevronRight, Eye, GraduationCap, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { MentorPublicItem } from "@/lib/mock/mentors";

export function MentorListRow({ m }: { m: MentorPublicItem }) {
  const recruiting = !!m.post;
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm transition hover:shadow-md">
      <img
        src={m.avatar}
        alt={m.info.profile.fullName}
        width={64}
        height={64}
        loading="lazy"
        className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-background"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold">{m.info.profile.fullName}</h3>
          <span className="text-xs text-muted-foreground">{m.info.profile.title}</span>
          <Badge
            variant="secondary"
            className={
              recruiting
                ? "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/15 dark:text-emerald-300"
                : "bg-muted text-muted-foreground hover:bg-muted"
            }
          >
            {recruiting ? "招生中" : "暂未发布"}
          </Badge>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5" /> {m.alumni}
          </span>
          <span className="inline-flex items-center gap-1">
            <Mail className="h-3.5 w-3.5" /> {m.info.profile.email}
          </span>
          <span>{m.info.profile.college}</span>
          <span className="inline-flex items-center gap-1" title="访问量">
            <Eye className="h-3.5 w-3.5" /> {m.views} 次访问
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {m.info.directions.map((d) => (
            <span
              key={d}
              className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
      <Link
        to="/student/public/$mentorId"
        params={{ mentorId: m.id }}
        className="inline-flex shrink-0 items-center gap-0.5 text-sm font-medium text-primary hover:underline"
      >
        View details
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
