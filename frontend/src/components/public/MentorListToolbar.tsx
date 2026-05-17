import { LayoutGrid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ViewMode = "grid" | "list";

export function MentorListToolbar({
  query,
  onQueryChange,
  view,
  onViewChange,
  count,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  count: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-card p-3 shadow-sm">
      <div className="relative min-w-[220px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="搜索导师姓名 / 学校 / 研究方向"
          className="h-9 pl-9"
        />
      </div>
      <PlaceholderSelect placeholder="学院" options={["全部", "计算机", "人工智能", "软件", "电子信息"]} />
      <PlaceholderSelect placeholder="职称" options={["全部", "教授", "副教授", "讲师"]} />
      <PlaceholderSelect placeholder="研究方向" options={["全部", "机器学习", "计算机视觉", "通信"]} />
      <div className="ml-auto flex items-center gap-3">
        <span className="hidden text-xs text-muted-foreground sm:block">共 {count} 位导师</span>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v) => v && onViewChange(v as ViewMode)}
          className="rounded-md border bg-background"
        >
          <ToggleGroupItem value="list" aria-label="列表视图" className="h-8 w-8 p-0">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="网格视图" className="h-8 w-8 p-0">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

function PlaceholderSelect({ placeholder, options }: { placeholder: string; options: string[] }) {
  return (
    <Select>
      <SelectTrigger className="h-9 w-[120px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
