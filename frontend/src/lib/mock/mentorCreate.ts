export interface MentorProfile {
  fullName: string;
  title: string; // 职称
  college: string;
  email: string;
  homepage: string;
}

export interface MentorEducationItem {
  id: string;
  school: string;
  degree: string;
  major: string;
  period: string;
}

export interface MentorHorizontalProject {
  id: string;
  name: string;
  client: string;
  budget: string;
  period: string;
  description: string;
}

export interface MentorVerticalProject {
  id: string;
  name: string;
  source: string; // 国家自然科学基金等
  code: string;
  role: string;
  period: string;
  description: string;
}

export interface MentorPaper {
  id: string;
  title: string;
  publishedAt: string;
  url?: string;
}

export interface MentorPatent {
  id: string;
  name: string;
  patentNo?: string;
  grantedAt?: string;
}

export interface MentorHonor {
  id: string;
  name: string;
  year?: string;
  issuer?: string;
}

export interface MentorWorkExperience {
  id: string;
  organization: string;
  position: string;
  period: string;
}

export interface MentorCourses {
  undergraduate: string[];
  graduate: string[];
}

export interface MentorInfoData {
  profile: MentorProfile;
  titles: string[];
  mentorTypes: string[];
  educations: MentorEducationItem[];
  workExperiences: MentorWorkExperience[];
  horizontal: MentorHorizontalProject[];
  vertical: MentorVerticalProject[];
  papers: MentorPaper[];
  patents: MentorPatent[];
  honors: MentorHonor[];
  courses: MentorCourses;
  directions: string[];
  studentRequirements: string;
  bio?: string;
}

export const emptyMentorInfo: MentorInfoData = {
  profile: {
    fullName: "李 教授",
    title: "教授 / 博士生导师",
    college: "计算机学院",
    email: "li.prof@univ.edu.cn",
    homepage: "",
  },
  titles: [],
  mentorTypes: ["硕士生导师"],
  educations: [],
  workExperiences: [],
  horizontal: [],
  vertical: [],
  papers: [],
  patents: [],
  honors: [],
  courses: { undergraduate: [], graduate: [] },
  directions: ["机器学习", "计算机视觉"],
  studentRequirements: "",
  bio: "",
};

export const mentorInfoSuggestions = [
  "帮我润色研究方向描述",
  "补充横向项目摘要",
  "生成对学生的要求",
  "整理近五年代表性成果",
];

export const mentorInfoIntro =
  "你好👋，我是你的导师主页助手。我可以帮你润色研究方向、整理项目摘要，或生成对学生的要求。";

/* ----------------------- Post (发布招生信息) ----------------------- */

export interface MentorPostData {
  title: string;
  batch: string;
  quota: string;
  degreeType: "硕士" | "博士" | "硕博连读";
  deadline: string;
  directions: string[];
  majorRequirement: string;
  degreeRequirement: string;
  abilityRequirements: string;
  bonus: string;
  workContent: string;
  contact: string;
  remark: string;
}

export const emptyMentorPost: MentorPostData = {
  title: "2026 级 机器学习方向 研究生招生",
  batch: "2026 级硕士研究生",
  quota: "2",
  degreeType: "硕士",
  deadline: "2026-04-30",
  directions: ["机器学习", "大模型"],
  majorRequirement: "计算机科学与技术、软件工程、人工智能、自动化等相关专业",
  degreeRequirement: "本科及以上学历，本科背景良好者优先",
  abilityRequirements: "",
  bonus: "",
  workContent: "",
  contact: "",
  remark: "",
};

export const mentorPostSuggestions = [
  "帮我写一段深度学习方向的能力要求",
  "生成 NLP 方向的加分项",
  "润色课题描述",
  "按 JD 风格整理招生公告",
];

export const mentorPostIntro =
  "你好👋，我是你的招生信息助手。告诉我研究方向与期望，我帮你写出一份清晰的招生 JD。";
