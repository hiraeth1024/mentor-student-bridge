import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionCard } from "./SectionCard";
import { emptyMentorPost, type MentorPostData } from "@/lib/mock/mentorCreate";
import { cn } from "@/lib/utils";

type Props = {
  data: MentorPostData;
  onChange: (next: MentorPostData) => void;
};

export function MentorPostEditor({ data, onChange }: Props) {
  const update = <K extends keyof MentorPostData>(key: K, value: MentorPostData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">发布招生信息</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => onChange(emptyMentorPost)}
        >
          <Trash2 className="h-3.5 w-3.5" /> Clear form
        </Button>
      </div>

      <SectionCard title="招生基本信息" description="批次、名额、学位与截止日期">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Field label="招生标题" className="md:col-span-2">
            <Input
              value={data.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </Field>
          <Field label="批次">
            <Input
              value={data.batch}
              onChange={(e) => update("batch", e.target.value)}
            />
          </Field>
          <Field label="招生人数">
            <Input
              value={data.quota}
              onChange={(e) => update("quota", e.target.value)}
            />
          </Field>
          <Field label="学位类型">
            <Select
              value={data.degreeType}
              onValueChange={(v) => update("degreeType", v as MentorPostData["degreeType"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="硕士">硕士</SelectItem>
                <SelectItem value="博士">博士</SelectItem>
                <SelectItem value="硕博连读">硕博连读</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="截止日期">
            <Input
              type="date"
              value={data.deadline}
              onChange={(e) => update("deadline", e.target.value)}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="研究方向" description="希望学生加入的方向">
        <TagInput
          tags={data.directions}
          onChange={(tags) => update("directions", tags)}
          placeholder="如：大模型、强化学习..."
        />
      </SectionCard>

      <SectionCard title="专业要求" description="本科背景与学历要求">
        <div className="grid grid-cols-1 gap-3">
          <Field label="本科专业">
            <Textarea
              rows={2}
              value={data.majorRequirement}
              onChange={(e) => update("majorRequirement", e.target.value)}
            />
          </Field>
          <Field label="学历要求">
            <Textarea
              rows={2}
              value={data.degreeRequirement}
              onChange={(e) => update("degreeRequirement", e.target.value)}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="能力要求" description="编程、英语、论文、项目经验等">
        <Textarea
          rows={5}
          placeholder={
            "例如：\n- 熟练使用 Python 与 PyTorch\n- 英语六级及以上，能阅读英文文献\n- 有过深度学习相关项目经验"
          }
          value={data.abilityRequirements}
          onChange={(e) => update("abilityRequirements", e.target.value)}
        />
      </SectionCard>

      <SectionCard title="加分项" description="非必需，但会优先考虑">
        <Textarea
          rows={4}
          placeholder={"例如：\n- 顶会顶刊论文一作\n- 知名竞赛获奖\n- 相关实习经历"}
          value={data.bonus}
          onChange={(e) => update("bonus", e.target.value)}
        />
      </SectionCard>

      <SectionCard title="工作内容 / 课题描述">
        <Textarea
          rows={5}
          placeholder="入组后将参与的课题方向、预期产出与培养计划..."
          value={data.workContent}
          onChange={(e) => update("workContent", e.target.value)}
        />
      </SectionCard>

      <SectionCard title="联系方式与备注">
        <div className="grid grid-cols-1 gap-3">
          <Field label="联系方式">
            <Input
              placeholder="邮箱或微信，建议附简历+本科成绩单"
              value={data.contact}
              onChange={(e) => update("contact", e.target.value)}
            />
          </Field>
          <Field label="备注">
            <Textarea
              rows={3}
              value={data.remark}
              onChange={(e) => update("remark", e.target.value)}
            />
          </Field>
        </div>
      </SectionCard>
    </div>
  );
}

function TagInput({
  tags,
  onChange,
  placeholder,
}: {
  tags: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [val, setVal] = useState("");
  const add = () => {
    const t = val.trim();
    if (!t || tags.includes(t)) return;
    onChange([...tags, t]);
    setVal("");
  };
  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs"
          >
            {t}
            <button
              type="button"
              onClick={() => onChange(tags.filter((x) => x !== t))}
              aria-label={`移除 ${t}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {tags.length === 0 && (
          <span className="text-xs text-muted-foreground">尚未添加标签</span>
        )}
      </div>
      <div className="flex gap-2">
        <Input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
        />
        <Button size="sm" variant="outline" onClick={add}>
          添加
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
