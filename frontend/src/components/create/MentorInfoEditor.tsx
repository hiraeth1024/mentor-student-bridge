import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionCard } from "./SectionCard";
import {
  emptyMentorInfo,
  type MentorInfoData,
} from "@/lib/mock/mentorCreate";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  data: MentorInfoData;
  onChange: (next: MentorInfoData) => void;
};

const newId = () => crypto.randomUUID();

export function MentorInfoEditor({ data, onChange }: Props) {
  const update = <K extends keyof MentorInfoData>(key: K, value: MentorInfoData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">导师信息</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => onChange(emptyMentorInfo)}
        >
          <Trash2 className="h-3.5 w-3.5" /> Clear form
        </Button>
      </div>

      {/* 个人信息 */}
      <SectionCard title="个人信息" description="姓名、职称、学院与联系方式">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Field label="姓名">
            <Input
              value={data.profile.fullName}
              onChange={(e) =>
                update("profile", { ...data.profile, fullName: e.target.value })
              }
            />
          </Field>
          <Field label="职称">
            <Input
              placeholder="教授 / 副教授 / 讲师"
              value={data.profile.title}
              onChange={(e) =>
                update("profile", { ...data.profile, title: e.target.value })
              }
            />
          </Field>
          <Field label="学院 / 单位">
            <Input
              value={data.profile.college}
              onChange={(e) =>
                update("profile", { ...data.profile, college: e.target.value })
              }
            />
          </Field>
          <Field label="邮箱">
            <Input
              value={data.profile.email}
              onChange={(e) =>
                update("profile", { ...data.profile, email: e.target.value })
              }
            />
          </Field>
          <Field label="个人主页" className="md:col-span-2">
            <Input
              placeholder="https://..."
              value={data.profile.homepage}
              onChange={(e) =>
                update("profile", { ...data.profile, homepage: e.target.value })
              }
            />
          </Field>
        </div>
      </SectionCard>

      {/* 职务 */}
      <SectionCard title="职务" description="可填写多个，例如「学院院长」「党委副书记」">
        <TagInput
          tags={data.titles}
          onChange={(tags) => update("titles", tags)}
          placeholder="如：信息与电子工程学院院长"
        />
      </SectionCard>

      {/* 导师类别 */}
      <SectionCard title="导师类别" description="可多选">
        <MultiSelect
          options={["硕士生导师", "博士生导师", "专硕导师", "联合培养导师"]}
          value={data.mentorTypes}
          onChange={(v) => update("mentorTypes", v)}
        />
      </SectionCard>

      <SectionCard
        title="教育背景"
        description="按时间倒序填写"
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              update("educations", [
                ...data.educations,
                { id: newId(), school: "", degree: "", major: "", period: "" },
              ])
            }
          >
            + Add
          </Button>
        }
      >
        {data.educations.length === 0 ? (
          <EmptyHint text="尚未添加教育背景" />
        ) : (
          <div className="space-y-3">
            {data.educations.map((item, idx) => (
              <SubItem
                key={item.id}
                onRemove={() =>
                  update(
                    "educations",
                    data.educations.filter((e) => e.id !== item.id),
                  )
                }
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="学校">
                    <Input
                      value={item.school}
                      onChange={(e) => {
                        const next = [...data.educations];
                        next[idx] = { ...item, school: e.target.value };
                        update("educations", next);
                      }}
                    />
                  </Field>
                  <Field label="学位">
                    <Input
                      placeholder="博士 / 硕士 / 学士"
                      value={item.degree}
                      onChange={(e) => {
                        const next = [...data.educations];
                        next[idx] = { ...item, degree: e.target.value };
                        update("educations", next);
                      }}
                    />
                  </Field>
                  <Field label="专业">
                    <Input
                      value={item.major}
                      onChange={(e) => {
                        const next = [...data.educations];
                        next[idx] = { ...item, major: e.target.value };
                        update("educations", next);
                      }}
                    />
                  </Field>
                  <Field label="起止时间">
                    <Input
                      placeholder="2005.09 – 2010.06"
                      value={item.period}
                      onChange={(e) => {
                        const next = [...data.educations];
                        next[idx] = { ...item, period: e.target.value };
                        update("educations", next);
                      }}
                    />
                  </Field>
                </div>
              </SubItem>
            ))}
          </div>
        )}
      </SectionCard>

      {/* 横向科研 */}
      <SectionCard
        title="横向科研"
        description="企业 / 政府委托类合作项目"
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              update("horizontal", [
                ...data.horizontal,
                {
                  id: newId(),
                  name: "",
                  client: "",
                  budget: "",
                  period: "",
                  description: "",
                },
              ])
            }
          >
            + Add
          </Button>
        }
      >
        {data.horizontal.length === 0 ? (
          <EmptyHint text="尚未添加横向科研" />
        ) : (
          <div className="space-y-3">
            {data.horizontal.map((item, idx) => (
              <SubItem
                key={item.id}
                onRemove={() =>
                  update(
                    "horizontal",
                    data.horizontal.filter((e) => e.id !== item.id),
                  )
                }
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="项目名">
                    <Input
                      value={item.name}
                      onChange={(e) => {
                        const next = [...data.horizontal];
                        next[idx] = { ...item, name: e.target.value };
                        update("horizontal", next);
                      }}
                    />
                  </Field>
                  <Field label="委托方">
                    <Input
                      value={item.client}
                      onChange={(e) => {
                        const next = [...data.horizontal];
                        next[idx] = { ...item, client: e.target.value };
                        update("horizontal", next);
                      }}
                    />
                  </Field>
                  <Field label="经费">
                    <Input
                      placeholder="如：80 万"
                      value={item.budget}
                      onChange={(e) => {
                        const next = [...data.horizontal];
                        next[idx] = { ...item, budget: e.target.value };
                        update("horizontal", next);
                      }}
                    />
                  </Field>
                  <Field label="起止时间">
                    <Input
                      value={item.period}
                      onChange={(e) => {
                        const next = [...data.horizontal];
                        next[idx] = { ...item, period: e.target.value };
                        update("horizontal", next);
                      }}
                    />
                  </Field>
                  <Field label="描述" className="md:col-span-2">
                    <Textarea
                      rows={3}
                      value={item.description}
                      onChange={(e) => {
                        const next = [...data.horizontal];
                        next[idx] = { ...item, description: e.target.value };
                        update("horizontal", next);
                      }}
                    />
                  </Field>
                </div>
              </SubItem>
            ))}
          </div>
        )}
      </SectionCard>

      {/* 纵向科研 */}
      <SectionCard
        title="纵向科研"
        description="国家自然科学基金、省部级课题等"
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              update("vertical", [
                ...data.vertical,
                {
                  id: newId(),
                  name: "",
                  source: "",
                  code: "",
                  role: "",
                  period: "",
                  description: "",
                },
              ])
            }
          >
            + Add
          </Button>
        }
      >
        {data.vertical.length === 0 ? (
          <EmptyHint text="尚未添加纵向科研" />
        ) : (
          <div className="space-y-3">
            {data.vertical.map((item, idx) => (
              <SubItem
                key={item.id}
                onRemove={() =>
                  update(
                    "vertical",
                    data.vertical.filter((e) => e.id !== item.id),
                  )
                }
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="项目名" className="md:col-span-2">
                    <Input
                      value={item.name}
                      onChange={(e) => {
                        const next = [...data.vertical];
                        next[idx] = { ...item, name: e.target.value };
                        update("vertical", next);
                      }}
                    />
                  </Field>
                  <Field label="来源">
                    <Input
                      placeholder="国家自然科学基金面上项目"
                      value={item.source}
                      onChange={(e) => {
                        const next = [...data.vertical];
                        next[idx] = { ...item, source: e.target.value };
                        update("vertical", next);
                      }}
                    />
                  </Field>
                  <Field label="编号">
                    <Input
                      value={item.code}
                      onChange={(e) => {
                        const next = [...data.vertical];
                        next[idx] = { ...item, code: e.target.value };
                        update("vertical", next);
                      }}
                    />
                  </Field>
                  <Field label="角色">
                    <Input
                      placeholder="主持 / 参与"
                      value={item.role}
                      onChange={(e) => {
                        const next = [...data.vertical];
                        next[idx] = { ...item, role: e.target.value };
                        update("vertical", next);
                      }}
                    />
                  </Field>
                  <Field label="起止时间">
                    <Input
                      value={item.period}
                      onChange={(e) => {
                        const next = [...data.vertical];
                        next[idx] = { ...item, period: e.target.value };
                        update("vertical", next);
                      }}
                    />
                  </Field>
                  <Field label="描述" className="md:col-span-2">
                    <Textarea
                      rows={3}
                      value={item.description}
                      onChange={(e) => {
                        const next = [...data.vertical];
                        next[idx] = { ...item, description: e.target.value };
                        update("vertical", next);
                      }}
                    />
                  </Field>
                </div>
              </SubItem>
            ))}
          </div>
        )}
      </SectionCard>

      {/* 研究方向 */}
      <SectionCard title="研究方向" description="以标签形式呈现，回车或加号添加">
        <TagInput
          tags={data.directions}
          onChange={(tags) => update("directions", tags)}
          placeholder="如：大模型、计算机视觉..."
        />
      </SectionCard>

      {/* 工作经历 */}
      <SectionCard
        title="工作经历"
        description="任职单位、职位与时间"
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              update("workExperiences", [
                ...data.workExperiences,
                { id: newId(), organization: "", position: "", period: "" },
              ])
            }
          >
            + Add
          </Button>
        }
      >
        {data.workExperiences.length === 0 ? (
          <EmptyHint text="尚未添加工作经历" />
        ) : (
          <div className="space-y-3">
            {data.workExperiences.map((item, idx) => (
              <SubItem
                key={item.id}
                onRemove={() =>
                  update(
                    "workExperiences",
                    data.workExperiences.filter((e) => e.id !== item.id),
                  )
                }
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="单位">
                    <Input
                      value={item.organization}
                      onChange={(e) => {
                        const next = [...data.workExperiences];
                        next[idx] = { ...item, organization: e.target.value };
                        update("workExperiences", next);
                      }}
                    />
                  </Field>
                  <Field label="职位">
                    <Input
                      value={item.position}
                      onChange={(e) => {
                        const next = [...data.workExperiences];
                        next[idx] = { ...item, position: e.target.value };
                        update("workExperiences", next);
                      }}
                    />
                  </Field>
                  <Field label="起止时间" className="md:col-span-2">
                    <Input
                      placeholder="2019 – 至今"
                      value={item.period}
                      onChange={(e) => {
                        const next = [...data.workExperiences];
                        next[idx] = { ...item, period: e.target.value };
                        update("workExperiences", next);
                      }}
                    />
                  </Field>
                </div>
              </SubItem>
            ))}
          </div>
        )}
      </SectionCard>

      {/* 发表论文 */}
      <SectionCard
        title="发表论文"
        description="论文名、发表时间，可选 URL"
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              update("papers", [
                ...data.papers,
                { id: newId(), title: "", publishedAt: "", url: "" },
              ])
            }
          >
            + Add
          </Button>
        }
      >
        {data.papers.length === 0 ? (
          <EmptyHint text="尚未添加论文" />
        ) : (
          <div className="space-y-3">
            {data.papers.map((item, idx) => (
              <SubItem
                key={item.id}
                onRemove={() =>
                  update(
                    "papers",
                    data.papers.filter((e) => e.id !== item.id),
                  )
                }
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="论文名" className="md:col-span-2">
                    <Input
                      value={item.title}
                      onChange={(e) => {
                        const next = [...data.papers];
                        next[idx] = { ...item, title: e.target.value };
                        update("papers", next);
                      }}
                    />
                  </Field>
                  <Field label="发表时间 / 期刊">
                    <Input
                      placeholder="如：NeurIPS 2024"
                      value={item.publishedAt}
                      onChange={(e) => {
                        const next = [...data.papers];
                        next[idx] = { ...item, publishedAt: e.target.value };
                        update("papers", next);
                      }}
                    />
                  </Field>
                  <Field label="URL（可选）">
                    <Input
                      placeholder="https://..."
                      value={item.url ?? ""}
                      onChange={(e) => {
                        const next = [...data.papers];
                        next[idx] = { ...item, url: e.target.value };
                        update("papers", next);
                      }}
                    />
                  </Field>
                </div>
              </SubItem>
            ))}
          </div>
        )}
      </SectionCard>

      {/* 专利 */}
      <SectionCard
        title="专利"
        description="发明专利 / 实用新型 / 软著等"
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              update("patents", [
                ...data.patents,
                { id: newId(), name: "", patentNo: "", grantedAt: "" },
              ])
            }
          >
            + Add
          </Button>
        }
      >
        {data.patents.length === 0 ? (
          <EmptyHint text="尚未添加专利" />
        ) : (
          <div className="space-y-3">
            {data.patents.map((item, idx) => (
              <SubItem
                key={item.id}
                onRemove={() =>
                  update("patents", data.patents.filter((e) => e.id !== item.id))
                }
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="专利名称" className="md:col-span-2">
                    <Input
                      value={item.name}
                      onChange={(e) => {
                        const next = [...data.patents];
                        next[idx] = { ...item, name: e.target.value };
                        update("patents", next);
                      }}
                    />
                  </Field>
                  <Field label="专利号">
                    <Input
                      value={item.patentNo ?? ""}
                      onChange={(e) => {
                        const next = [...data.patents];
                        next[idx] = { ...item, patentNo: e.target.value };
                        update("patents", next);
                      }}
                    />
                  </Field>
                  <Field label="授权时间">
                    <Input
                      placeholder="2024-06"
                      value={item.grantedAt ?? ""}
                      onChange={(e) => {
                        const next = [...data.patents];
                        next[idx] = { ...item, grantedAt: e.target.value };
                        update("patents", next);
                      }}
                    />
                  </Field>
                </div>
              </SubItem>
            ))}
          </div>
        )}
      </SectionCard>

      {/* 荣誉及奖励 */}
      <SectionCard
        title="荣誉及奖励"
        description="各类人才计划、获奖经历"
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              update("honors", [
                ...data.honors,
                { id: newId(), name: "", year: "", issuer: "" },
              ])
            }
          >
            + Add
          </Button>
        }
      >
        {data.honors.length === 0 ? (
          <EmptyHint text="尚未添加荣誉" />
        ) : (
          <div className="space-y-3">
            {data.honors.map((item, idx) => (
              <SubItem
                key={item.id}
                onRemove={() =>
                  update("honors", data.honors.filter((e) => e.id !== item.id))
                }
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="名称" className="md:col-span-2">
                    <Input
                      value={item.name}
                      onChange={(e) => {
                        const next = [...data.honors];
                        next[idx] = { ...item, name: e.target.value };
                        update("honors", next);
                      }}
                    />
                  </Field>
                  <Field label="授予方">
                    <Input
                      value={item.issuer ?? ""}
                      onChange={(e) => {
                        const next = [...data.honors];
                        next[idx] = { ...item, issuer: e.target.value };
                        update("honors", next);
                      }}
                    />
                  </Field>
                  <Field label="年份">
                    <Input
                      value={item.year ?? ""}
                      onChange={(e) => {
                        const next = [...data.honors];
                        next[idx] = { ...item, year: e.target.value };
                        update("honors", next);
                      }}
                    />
                  </Field>
                </div>
              </SubItem>
            ))}
          </div>
        )}
      </SectionCard>

      {/* 开授课程 */}
      <SectionCard title="开授课程" description="本科课程与研究生课程">
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block text-xs text-muted-foreground">本科课程</Label>
            <TagInput
              tags={data.courses.undergraduate}
              onChange={(tags) =>
                update("courses", { ...data.courses, undergraduate: tags })
              }
              placeholder="如：数据结构"
            />
          </div>
          <div>
            <Label className="mb-2 block text-xs text-muted-foreground">研究生课程</Label>
            <TagInput
              tags={data.courses.graduate}
              onChange={(tags) =>
                update("courses", { ...data.courses, graduate: tags })
              }
              placeholder="如：深度学习"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="个人简介" description="一段简短的自我介绍，将显示在导师详情页">
        <Textarea
          rows={5}
          placeholder="例如：长期从事xxx领域的研究，主持国家自然科学基金..."
          value={data.bio ?? ""}
          onChange={(e) => update("bio", e.target.value)}
        />
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

function MultiSelect({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  };
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = value.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition",
              active
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground hover:bg-accent",
            )}
          >
            {opt}
          </button>
        );
      })}
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

function SubItem({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <div className="relative rounded-xl border bg-background/40 p-4">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-7 w-7 text-muted-foreground"
        onClick={onRemove}
        aria-label="删除"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
      {children}
    </div>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <p className="rounded-lg border border-dashed bg-muted/30 px-3 py-6 text-center text-xs text-muted-foreground">
      {text}
    </p>
  );
}
