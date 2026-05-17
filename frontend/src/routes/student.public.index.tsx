import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/home/PageShell";
import { MentorListToolbar, type ViewMode } from "@/components/public/MentorListToolbar";
import { MentorCard } from "@/components/public/MentorCard";
import { MentorListRow } from "@/components/public/MentorListRow";
import { mentorList } from "@/lib/mock/mentors";

export const Route = createFileRoute("/student/public/")({
  component: StudentPublicPage,
});

function StudentPublicPage() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mentorList;
    return mentorList.filter((m) => {
      const hay = [
        m.info.profile.fullName,
        m.info.profile.college,
        m.info.profile.email,
        m.alumni,
        ...m.info.directions,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  return (
    <PageShell title="Public · 浏览导师">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5">
        <MentorListToolbar
          query={query}
          onQueryChange={setQuery}
          view={view}
          onViewChange={setView}
          count={filtered.length}
        />

        {filtered.length === 0 ? (
          <div className="rounded-2xl border bg-card p-12 text-center text-sm text-muted-foreground">
            没有找到匹配的导师
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((m) => (
              <MentorCard key={m.id} m={m} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((m) => (
              <MentorListRow key={m.id} m={m} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
