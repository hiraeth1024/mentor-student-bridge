import { Trash2 } from "lucide-react";
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
import {
  emptyResume,
  examStatusLabel,
  type ExamInfo,
  type ResumeData,
} from "@/lib/mock/resume";

type Props = {
  data: ResumeData;
  onChange: (next: ResumeData) => void;
};

const newId = () => crypto.randomUUID();

export function EditorPanel({ data, onChange }: Props) {
  const update = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Resume Details</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => onChange(emptyResume)}
        >
          <Trash2 className="h-3.5 w-3.5" /> Clear form
        </Button>
      </div>

      {/* Contact */}
      <SectionCard title="Contact 个人信息" description="姓名、目标方向、联系方式">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Field label="姓名">
            <Input
              value={data.contact.fullName}
              onChange={(e) =>
                update("contact", { ...data.contact, fullName: e.target.value })
              }
            />
          </Field>
          <Field label="目标方向 / Title">
            <Input
              placeholder="如：计算机科学硕士"
              value={data.contact.title}
              onChange={(e) =>
                update("contact", { ...data.contact, title: e.target.value })
              }
            />
          </Field>
          <Field label="邮箱">
            <Input
              value={data.contact.email}
              onChange={(e) =>
                update("contact", { ...data.contact, email: e.target.value })
              }
            />
          </Field>
          <Field label="电话">
            <Input
              value={data.contact.phone}
              onChange={(e) =>
                update("contact", { ...data.contact, phone: e.target.value })
              }
            />
          </Field>
          <Field label="所在地" className="md:col-span-2">
            <Input
              value={data.contact.location}
              onChange={(e) =>
                update("contact", { ...data.contact, location: e.target.value })
              }
            />
          </Field>
        </div>
      </SectionCard>

      {/* Summary */}
      <SectionCard title="Summary 个人简介" description="简要的研究兴趣与目标，2–4 句">
        <Textarea
          rows={4}
          placeholder="例如：本科就读于 XX 大学计算机系，专注机器学习方向，希望在研究生阶段深入..."
          value={data.summary}
          onChange={(e) => update("summary", e.target.value)}
        />
      </SectionCard>

      {/* Education */}
      <SectionCard
        title="Education 教育经历"
        description="学校、专业、学位、起止时间"
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              update("education", [
                ...data.education,
                {
                  id: newId(),
                  school: "",
                  major: "",
                  degree: "",
                  start: "",
                  end: "",
                  gpa: "",
                },
              ])
            }
          >
            + Add
          </Button>
        }
      >
        {data.education.length === 0 ? (
          <EmptyHint text="尚未添加教育经历" />
        ) : (
          <div className="space-y-3">
            {data.education.map((item, idx) => (
              <SubItem
                key={item.id}
                onRemove={() =>
                  update(
                    "education",
                    data.education.filter((e) => e.id !== item.id),
                  )
                }
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="学校">
                    <Input
                      value={item.school}
                      onChange={(e) => {
                        const next = [...data.education];
                        next[idx] = { ...item, school: e.target.value };
                        update("education", next);
                      }}
                    />
                  </Field>
                  <Field label="专业">
                    <Input
                      value={item.major}
                      onChange={(e) => {
                        const next = [...data.education];
                        next[idx] = { ...item, major: e.target.value };
                        update("education", next);
                      }}
                    />
                  </Field>
                  <Field label="学位">
                    <Input
                      placeholder="如：本科 / 硕士"
                      value={item.degree}
                      onChange={(e) => {
                        const next = [...data.education];
                        next[idx] = { ...item, degree: e.target.value };
                        update("education", next);
                      }}
                    />
                  </Field>
                  <Field label="GPA">
                    <Input
                      placeholder="如：3.8/4.0"
                      value={item.gpa}
                      onChange={(e) => {
                        const next = [...data.education];
                        next[idx] = { ...item, gpa: e.target.value };
                        update("education", next);
                      }}
                    />
                  </Field>
                  <Field label="开始">
                    <Input
                      placeholder="2022.09"
                      value={item.start}
                      onChange={(e) => {
                        const next = [...data.education];
                        next[idx] = { ...item, start: e.target.value };
                        update("education", next);
                      }}
                    />
                  </Field>
                  <Field label="结束">
                    <Input
                      placeholder="2026.06"
                      value={item.end}
                      onChange={(e) => {
                        const next = [...data.education];
                        next[idx] = { ...item, end: e.target.value };
                        update("education", next);
                      }}
                    />
                  </Field>
                </div>
              </SubItem>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Exam */}
      <SectionCard title="考研信息" description="报考目标与初试成绩">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Field label="报考院校">
            <Input
              value={data.exam.targetSchool}
              onChange={(e) =>
                update("exam", { ...data.exam, targetSchool: e.target.value })
              }
            />
          </Field>
          <Field label="报考专业">
            <Input
              value={data.exam.targetMajor}
              onChange={(e) =>
                update("exam", { ...data.exam, targetMajor: e.target.value })
              }
            />
          </Field>
          <Field label="初试总分">
            <Input
              value={data.exam.totalScore}
              onChange={(e) =>
                update("exam", { ...data.exam, totalScore: e.target.value })
              }
            />
          </Field>
          <Field label="复试状态">
            <Select
              value={data.exam.status}
              onValueChange={(v) =>
                update("exam", { ...data.exam, status: v as ExamInfo["status"] })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(examStatusLabel) as ExamInfo["status"][]).map((k) => (
                  <SelectItem key={k} value={k}>
                    {examStatusLabel[k]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="政治">
            <Input
              value={data.exam.political}
              onChange={(e) =>
                update("exam", { ...data.exam, political: e.target.value })
              }
            />
          </Field>
          <Field label="英语">
            <Input
              value={data.exam.english}
              onChange={(e) =>
                update("exam", { ...data.exam, english: e.target.value })
              }
            />
          </Field>
          <Field label="数学">
            <Input
              value={data.exam.math}
              onChange={(e) =>
                update("exam", { ...data.exam, math: e.target.value })
              }
            />
          </Field>
          <Field label="专业课">
            <Input
              value={data.exam.major}
              onChange={(e) =>
                update("exam", { ...data.exam, major: e.target.value })
              }
            />
          </Field>
        </div>
      </SectionCard>

      {/* Experience */}
      <SectionCard
        title="Experience 个人经历"
        description="实习、工作、社团经历"
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              update("experience", [
                ...data.experience,
                {
                  id: newId(),
                  org: "",
                  role: "",
                  start: "",
                  end: "",
                  description: "",
                },
              ])
            }
          >
            + Add
          </Button>
        }
      >
        {data.experience.length === 0 ? (
          <EmptyHint text="尚未添加经历" />
        ) : (
          <div className="space-y-3">
            {data.experience.map((item, idx) => (
              <SubItem
                key={item.id}
                onRemove={() =>
                  update(
                    "experience",
                    data.experience.filter((e) => e.id !== item.id),
                  )
                }
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="组织 / 公司">
                    <Input
                      value={item.org}
                      onChange={(e) => {
                        const next = [...data.experience];
                        next[idx] = { ...item, org: e.target.value };
                        update("experience", next);
                      }}
                    />
                  </Field>
                  <Field label="角色">
                    <Input
                      value={item.role}
                      onChange={(e) => {
                        const next = [...data.experience];
                        next[idx] = { ...item, role: e.target.value };
                        update("experience", next);
                      }}
                    />
                  </Field>
                  <Field label="开始">
                    <Input
                      value={item.start}
                      onChange={(e) => {
                        const next = [...data.experience];
                        next[idx] = { ...item, start: e.target.value };
                        update("experience", next);
                      }}
                    />
                  </Field>
                  <Field label="结束">
                    <Input
                      value={item.end}
                      onChange={(e) => {
                        const next = [...data.experience];
                        next[idx] = { ...item, end: e.target.value };
                        update("experience", next);
                      }}
                    />
                  </Field>
                  <Field label="描述" className="md:col-span-2">
                    <Textarea
                      rows={3}
                      value={item.description}
                      onChange={(e) => {
                        const next = [...data.experience];
                        next[idx] = { ...item, description: e.target.value };
                        update("experience", next);
                      }}
                    />
                  </Field>
                </div>
              </SubItem>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Projects */}
      <SectionCard
        title="Projects 项目经历"
        description="个人 / 团队项目"
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              update("projects", [
                ...data.projects,
                { id: newId(), name: "", role: "", stack: "", description: "" },
              ])
            }
          >
            + Add
          </Button>
        }
      >
        {data.projects.length === 0 ? (
          <EmptyHint text="尚未添加项目" />
        ) : (
          <div className="space-y-3">
            {data.projects.map((item, idx) => (
              <SubItem
                key={item.id}
                onRemove={() =>
                  update(
                    "projects",
                    data.projects.filter((e) => e.id !== item.id),
                  )
                }
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="项目名">
                    <Input
                      value={item.name}
                      onChange={(e) => {
                        const next = [...data.projects];
                        next[idx] = { ...item, name: e.target.value };
                        update("projects", next);
                      }}
                    />
                  </Field>
                  <Field label="角色">
                    <Input
                      value={item.role}
                      onChange={(e) => {
                        const next = [...data.projects];
                        next[idx] = { ...item, role: e.target.value };
                        update("projects", next);
                      }}
                    />
                  </Field>
                  <Field label="技术栈" className="md:col-span-2">
                    <Input
                      placeholder="React, PyTorch, ..."
                      value={item.stack}
                      onChange={(e) => {
                        const next = [...data.projects];
                        next[idx] = { ...item, stack: e.target.value };
                        update("projects", next);
                      }}
                    />
                  </Field>
                  <Field label="描述" className="md:col-span-2">
                    <Textarea
                      rows={3}
                      value={item.description}
                      onChange={(e) => {
                        const next = [...data.projects];
                        next[idx] = { ...item, description: e.target.value };
                        update("projects", next);
                      }}
                    />
                  </Field>
                </div>
              </SubItem>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Research */}
      <SectionCard
        title="Research 学术经历"
        description="论文、课题、科研项目"
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              update("research", [
                ...data.research,
                { id: newId(), title: "", role: "", period: "", description: "" },
              ])
            }
          >
            + Add
          </Button>
        }
      >
        {data.research.length === 0 ? (
          <EmptyHint text="尚未添加学术经历" />
        ) : (
          <div className="space-y-3">
            {data.research.map((item, idx) => (
              <SubItem
                key={item.id}
                onRemove={() =>
                  update(
                    "research",
                    data.research.filter((e) => e.id !== item.id),
                  )
                }
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="题目">
                    <Input
                      value={item.title}
                      onChange={(e) => {
                        const next = [...data.research];
                        next[idx] = { ...item, title: e.target.value };
                        update("research", next);
                      }}
                    />
                  </Field>
                  <Field label="角色">
                    <Input
                      value={item.role}
                      onChange={(e) => {
                        const next = [...data.research];
                        next[idx] = { ...item, role: e.target.value };
                        update("research", next);
                      }}
                    />
                  </Field>
                  <Field label="时间" className="md:col-span-2">
                    <Input
                      placeholder="2024.09 - 2025.06"
                      value={item.period}
                      onChange={(e) => {
                        const next = [...data.research];
                        next[idx] = { ...item, period: e.target.value };
                        update("research", next);
                      }}
                    />
                  </Field>
                  <Field label="描述" className="md:col-span-2">
                    <Textarea
                      rows={3}
                      value={item.description}
                      onChange={(e) => {
                        const next = [...data.research];
                        next[idx] = { ...item, description: e.target.value };
                        update("research", next);
                      }}
                    />
                  </Field>
                </div>
              </SubItem>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function SubItem({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <div className="relative rounded-xl border bg-muted/40 p-4">
      <button
        onClick={onRemove}
        className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-destructive"
        aria-label="删除"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
      {children}
    </div>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <p className="rounded-lg border border-dashed bg-muted/30 px-3 py-4 text-center text-xs text-muted-foreground">
      {text}
    </p>
  );
}
