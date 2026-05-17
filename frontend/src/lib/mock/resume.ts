export interface ContactInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  links: { id: string; label: string; url: string }[];
}

export interface EducationItem {
  id: string;
  school: string;
  major: string;
  degree: string;
  start: string;
  end: string;
  gpa: string;
}

export interface ExamInfo {
  targetSchool: string;
  targetMajor: string;
  totalScore: string;
  political: string;
  english: string;
  math: string;
  major: string;
  status: "not-started" | "to-interview" | "passed" | "failed";
}

export interface ExperienceItem {
  id: string;
  org: string;
  role: string;
  start: string;
  end: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  stack: string;
  description: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
}

export interface ResumeData {
  contact: ContactInfo;
  summary: string;
  education: EducationItem[];
  exam: ExamInfo;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  research: ResearchItem[];
}

export const emptyResume: ResumeData = {
  contact: {
    fullName: "Phanindra Kondru",
    title: "计算机科学硕士 · 申请 2026 级",
    email: "phanikondru@gmail.com",
    phone: "+91 96769 89240",
    location: "Hyderabad",
    links: [],
  },
  summary: "",
  education: [],
  exam: {
    targetSchool: "",
    targetMajor: "",
    totalScore: "",
    political: "",
    english: "",
    math: "",
    major: "",
    status: "not-started",
  },
  experience: [],
  projects: [],
  research: [],
};

export const suggestionChips = [
  "帮我润色研究经历",
  "生成个人陈述",
  "按机器学习方向重写",
  "补充科研技能关键词",
  "列出推荐项目经历",
];

export const examStatusLabel: Record<ExamInfo["status"], string> = {
  "not-started": "未参加",
  "to-interview": "待复试",
  passed: "已通过",
  failed: "未通过",
};
