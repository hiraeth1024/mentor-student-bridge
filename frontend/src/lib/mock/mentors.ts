import type {
  MentorInfoData,
  MentorPostData,
  MentorPaper,
  MentorPatent,
  MentorHonor,
  MentorWorkExperience,
  MentorCourses,
} from "./mentorCreate";
import avatar01 from "@/assets/avatars/mentor-01.png";
import avatar02 from "@/assets/avatars/mentor-02.png";
import avatar03 from "@/assets/avatars/mentor-03.png";
import avatar04 from "@/assets/avatars/mentor-04.png";
import avatar05 from "@/assets/avatars/mentor-05.png";
import avatar06 from "@/assets/avatars/mentor-06.png";
import avatar07 from "@/assets/avatars/mentor-07.png";
import avatar08 from "@/assets/avatars/mentor-08.png";

export interface MentorPublicItem {
  id: string;
  avatar: string;
  alumni: string;
  views: number;
  info: MentorInfoData;
  post: MentorPostData | null;
}

type InfoExtras = Partial<{
  titles: string[];
  mentorTypes: string[];
  workExperiences: MentorWorkExperience[];
  papers: MentorPaper[];
  patents: MentorPatent[];
  honors: MentorHonor[];
  courses: MentorCourses;
}>;

function withExtras(base: Omit<MentorInfoData, keyof InfoExtras | never>, extras: InfoExtras = {}): MentorInfoData {
  return {
    ...base,
    titles: extras.titles ?? [],
    mentorTypes: extras.mentorTypes ?? ["硕士生导师"],
    workExperiences: extras.workExperiences ?? [],
    papers: extras.papers ?? [],
    patents: extras.patents ?? [],
    honors: extras.honors ?? [],
    courses: extras.courses ?? { undergraduate: [], graduate: [] },
  };
}

export const mentorList: MentorPublicItem[] = [
  {
    id: "m01",
    avatar: avatar01,
    alumni: "清华大学 博士",
    views: 1284,
    info: withExtras(
      {
        profile: {
          fullName: "李 文涛",
          title: "教授 / 博士生导师",
          college: "计算机科学与技术学院",
          email: "liwt@univ.edu.cn",
          homepage: "https://cs.univ.edu.cn/~liwt",
        },
        educations: [
          { id: "e1", school: "清华大学", degree: "博士", major: "计算机科学", period: "2005-2010" },
          { id: "e2", school: "北京大学", degree: "学士", major: "计算机科学", period: "2001-2005" },
        ],
        horizontal: [
          {
            id: "h1",
            name: "智能问答系统研发",
            client: "某金融科技公司",
            budget: "120 万",
            period: "2023-2024",
            description: "面向金融场景的大模型问答与知识检索系统。",
          },
        ],
        vertical: [
          {
            id: "v1",
            name: "面向多模态学习的可解释性研究",
            source: "国家自然科学基金面上项目",
            code: "62XXXXXX",
            role: "项目负责人",
            period: "2022-2025",
            description: "研究多模态深度学习模型的可解释性方法。",
          },
        ],
        directions: ["机器学习", "大模型", "自然语言处理"],
        studentRequirements:
          "对机器学习有浓厚兴趣；具备扎实的数学基础与编程能力；有 PyTorch 项目经验者优先。",
      },
      {
        titles: ["计算机科学与技术学院 院长", "人工智能研究中心 主任"],
        mentorTypes: ["硕士生导师", "博士生导师"],
        workExperiences: [
          { id: "w1", organization: "本校 计算机学院", position: "教授", period: "2018-至今" },
          { id: "w2", organization: "Microsoft Research Asia", position: "Visiting Researcher", period: "2014-2015" },
        ],
        papers: [
          { id: "p1", title: "Multimodal Pretraining for Robust Reasoning", publishedAt: "NeurIPS 2024", url: "https://arxiv.org/abs/2401.00001" },
          { id: "p2", title: "Interpretable Attention in Large Language Models", publishedAt: "ACL 2023", url: "https://arxiv.org/abs/2305.12345" },
          { id: "p3", title: "A Survey on Retrieval-Augmented Generation", publishedAt: "TPAMI 2024" },
        ],
        patents: [
          { id: "pt1", name: "一种基于大模型的金融问答方法", patentNo: "ZL2023XXXXXXXX.X", grantedAt: "2024-06" },
        ],
        honors: [
          { id: "ho1", name: "国家优秀青年科学基金", year: "2020", issuer: "国家自然科学基金委" },
          { id: "ho2", name: "教育部科技进步一等奖", year: "2022" },
        ],
        courses: {
          undergraduate: ["数据结构", "人工智能导论"],
          graduate: ["深度学习", "自然语言处理前沿"],
        },
      },
    ),
    post: {
      title: "2026 级 大模型方向 硕士研究生招生",
      batch: "2026 级硕士研究生",
      quota: "2",
      degreeType: "硕士",
      deadline: "2026-04-30",
      directions: ["大模型", "NLP"],
      majorRequirement: "计算机科学与技术、人工智能、软件工程等相关专业",
      degreeRequirement: "本科及以上学历,本科背景良好者优先",
      abilityRequirements: "熟悉 Python / PyTorch;有大模型微调或 RAG 项目经验者优先。",
      bonus: "顶会论文、Kaggle 奖牌、开源贡献",
      workContent: "参与基础大模型训练、Agent 系统与多模态学习相关课题。",
      contact: "liwt@univ.edu.cn",
      remark: "欢迎对科研有热情的同学联系。",
    },
  },
  {
    id: "m02",
    avatar: avatar02,
    alumni: "中国科学院 博士",
    views: 642,
    info: withExtras(
      {
        profile: {
          fullName: "陈 思婷",
          title: "副教授 / 硕士生导师",
          college: "人工智能学院",
          email: "chenst@univ.edu.cn",
          homepage: "",
        },
        educations: [
          { id: "e1", school: "中国科学院", degree: "博士", major: "模式识别", period: "2012-2017" },
        ],
        horizontal: [],
        vertical: [
          { id: "v1", name: "小样本图像识别", source: "国家自然科学基金青年项目", code: "61XXXXXX", role: "项目负责人", period: "2021-2023", description: "" },
        ],
        directions: ["计算机视觉", "小样本学习"],
        studentRequirements: "热爱科研,主动性强;具有图像处理或深度学习相关经验。",
      },
      {
        titles: ["人工智能学院 副院长"],
        mentorTypes: ["硕士生导师"],
        workExperiences: [
          { id: "w1", organization: "本校 人工智能学院", position: "副教授", period: "2019-至今" },
        ],
        papers: [
          { id: "p1", title: "Few-Shot Image Segmentation via Meta-Learning", publishedAt: "CVPR 2023", url: "https://arxiv.org/abs/2304.00001" },
        ],
        honors: [{ id: "ho1", name: "校级青年教师教学竞赛 一等奖", year: "2022" }],
        courses: { undergraduate: ["计算机视觉"], graduate: ["小样本学习专题"] },
      },
    ),
    post: {
      title: "2026 级 计算机视觉方向 研究生招生",
      batch: "2026 级硕士研究生",
      quota: "1",
      degreeType: "硕士",
      deadline: "2026-04-15",
      directions: ["计算机视觉", "图像分割"],
      majorRequirement: "计算机、自动化、电子信息等相关专业",
      degreeRequirement: "本科及以上",
      abilityRequirements: "熟悉常用 CV 框架,有项目经验。",
      bonus: "",
      workContent: "医学影像分析与小样本视觉学习相关研究。",
      contact: "chenst@univ.edu.cn",
      remark: "",
    },
  },
  {
    id: "m03",
    avatar: avatar03,
    alumni: "麻省理工学院 博士后",
    views: 2089,
    info: withExtras(
      {
        profile: {
          fullName: "王 振华",
          title: "教授 / 长江学者",
          college: "电子信息工程学院",
          email: "wangzh@univ.edu.cn",
          homepage: "https://ee.univ.edu.cn/~wangzh",
        },
        educations: [
          { id: "e1", school: "MIT", degree: "博士后", major: "无线通信", period: "2002-2005" },
          { id: "e2", school: "上海交通大学", degree: "博士", major: "通信工程", period: "1997-2002" },
        ],
        horizontal: [
          { id: "h1", name: "6G 关键技术预研", client: "华为技术有限公司", budget: "300 万", period: "2023-2026", description: "下一代移动通信中的智能频谱管理与超大规模天线技术。" },
        ],
        vertical: [
          { id: "v1", name: "面向 6G 的智能反射面技术", source: "国家重点研发计划", code: "2023YFXXXX", role: "项目负责人", period: "2023-2027", description: "" },
        ],
        directions: ["无线通信", "信号处理", "6G"],
        studentRequirements:
          "数学功底扎实,熟悉信号处理基础;有 Matlab / Python 实现经验;吃苦耐劳。",
      },
      {
        titles: ["信息与电子工程学院 院长", "党委副书记", "国家重点实验室 主任"],
        mentorTypes: ["硕士生导师", "博士生导师"],
        workExperiences: [
          { id: "w1", organization: "本校 信息与电子工程学院", position: "教授", period: "2007-至今" },
          { id: "w2", organization: "MIT", position: "Postdoctoral Researcher", period: "2002-2005" },
        ],
        papers: [
          { id: "p1", title: "Intelligent Reflecting Surfaces for 6G", publishedAt: "IEEE JSAC 2024", url: "https://ieeexplore.ieee.org/document/xxx" },
          { id: "p2", title: "Massive MIMO Beamforming under Imperfect CSI", publishedAt: "IEEE TWC 2023" },
        ],
        patents: [
          { id: "pt1", name: "一种智能反射面相位优化方法", patentNo: "ZL2024XXXXXXXX.X", grantedAt: "2025-01" },
          { id: "pt2", name: "面向 6G 的频谱感知装置", patentNo: "ZL2023XXXXXXXX.Y", grantedAt: "2024-03" },
        ],
        honors: [
          { id: "ho1", name: "长江学者特聘教授", year: "2018", issuer: "教育部" },
          { id: "ho2", name: "国家科技进步二等奖", year: "2021" },
        ],
        courses: {
          undergraduate: ["通信原理", "信号与系统"],
          graduate: ["现代无线通信", "6G 前沿专题"],
        },
      },
    ),
    post: null,
  },
  {
    id: "m04",
    avatar: avatar04,
    alumni: "卡内基梅隆大学 博士",
    views: 873,
    info: withExtras(
      {
        profile: {
          fullName: "赵 雅琪",
          title: "副教授 / 博士生导师",
          college: "软件学院",
          email: "zhaoyq@univ.edu.cn",
          homepage: "",
        },
        educations: [
          { id: "e1", school: "Carnegie Mellon University", degree: "博士", major: "Software Engineering", period: "2014-2019" },
        ],
        horizontal: [],
        vertical: [
          { id: "v1", name: "AI 辅助软件测试", source: "国家自然科学基金面上", code: "62XXXXXX", role: "项目负责人", period: "2023-2026", description: "" },
        ],
        directions: ["软件工程", "AI for SE", "程序分析"],
        studentRequirements: "扎实的编程能力,熟悉至少一门系统级语言;对软工或编译方向有兴趣。",
      },
      {
        titles: ["软件学院 系主任"],
        mentorTypes: ["硕士生导师", "博士生导师"],
        workExperiences: [
          { id: "w1", organization: "本校 软件学院", position: "副教授", period: "2020-至今" },
          { id: "w2", organization: "Google", position: "Software Engineer Intern", period: "2018" },
        ],
        papers: [
          { id: "p1", title: "LLM-Powered Test Generation for Real-World APIs", publishedAt: "ICSE 2024", url: "https://arxiv.org/abs/2402.00001" },
        ],
        honors: [{ id: "ho1", name: "ACM SIGSOFT Distinguished Paper Award", year: "2023" }],
        courses: { undergraduate: ["软件工程"], graduate: ["程序分析", "AI for Software Engineering"] },
      },
    ),
    post: {
      title: "2026 级 AI for SE 方向 博士/硕士招生",
      batch: "2026 级硕博",
      quota: "3",
      degreeType: "硕博连读",
      deadline: "2026-03-31",
      directions: ["AI for SE", "程序分析"],
      majorRequirement: "软件工程、计算机科学相关专业",
      degreeRequirement: "本科及以上",
      abilityRequirements: "良好的算法基础与工程能力。",
      bonus: "开源贡献、ACM 竞赛获奖",
      workContent: "大模型驱动的代码生成、缺陷检测、自动测试。",
      contact: "zhaoyq@univ.edu.cn",
      remark: "",
    },
  },
  {
    id: "m05",
    avatar: avatar05,
    alumni: "浙江大学 博士",
    views: 421,
    info: withExtras(
      {
        profile: {
          fullName: "周 启明",
          title: "助理教授 / 硕士生导师",
          college: "计算机科学与技术学院",
          email: "zhouqm@univ.edu.cn",
          homepage: "",
        },
        educations: [
          { id: "e1", school: "浙江大学", degree: "博士", major: "计算机科学", period: "2017-2022" },
        ],
        horizontal: [],
        vertical: [],
        directions: ["强化学习", "具身智能", "机器人"],
        studentRequirements: "对机器人和具身智能感兴趣,有 ROS 经验加分。",
      },
      {
        mentorTypes: ["硕士生导师"],
        workExperiences: [{ id: "w1", organization: "本校 计算机学院", position: "助理教授", period: "2022-至今" }],
        papers: [
          { id: "p1", title: "Sim-to-Real RL for Quadruped Locomotion", publishedAt: "CoRL 2023", url: "https://arxiv.org/abs/2310.00001" },
        ],
        courses: { undergraduate: ["机器人学导论"], graduate: ["强化学习"] },
      },
    ),
    post: {
      title: "2026 级 具身智能方向 硕士研究生招生",
      batch: "2026 级硕士",
      quota: "2",
      degreeType: "硕士",
      deadline: "2026-04-20",
      directions: ["强化学习", "机器人"],
      majorRequirement: "计算机、自动化、机器人相关专业",
      degreeRequirement: "本科及以上",
      abilityRequirements: "Python 编程;熟悉 RL 或机器人基础。",
      bonus: "ROS、RoboMaster 比赛经验",
      workContent: "面向真实环境的具身智能 Agent 训练与部署。",
      contact: "zhouqm@univ.edu.cn",
      remark: "课题组氛围 chill,欢迎自驱型同学。",
    },
  },
  {
    id: "m06",
    avatar: avatar06,
    alumni: "复旦大学 博士",
    views: 1567,
    info: withExtras(
      {
        profile: {
          fullName: "孙 慧",
          title: "教授 / 系副主任",
          college: "网络空间安全学院",
          email: "sunh@univ.edu.cn",
          homepage: "",
        },
        educations: [
          { id: "e1", school: "复旦大学", degree: "博士", major: "信息安全", period: "2008-2013" },
        ],
        horizontal: [
          { id: "h1", name: "金融行业渗透测试平台", client: "某股份制银行", budget: "80 万", period: "2024-2025", description: "" },
        ],
        vertical: [],
        directions: ["系统安全", "Web 安全", "AI 安全"],
        studentRequirements: "对网络安全有真正的兴趣,具备 CTF 或漏洞挖掘经验者优先。",
      },
      {
        titles: ["网络空间安全学院 系副主任"],
        mentorTypes: ["硕士生导师", "博士生导师"],
        workExperiences: [
          { id: "w1", organization: "本校 网安学院", position: "教授", period: "2016-至今" },
        ],
        papers: [
          { id: "p1", title: "Practical Web Application Fuzzing at Scale", publishedAt: "USENIX Security 2024" },
        ],
        patents: [{ id: "pt1", name: "一种针对 Web 服务的自动化漏洞检测方法", patentNo: "ZL2022XXXXXXXX.X", grantedAt: "2023-09" }],
        honors: [{ id: "ho1", name: "中国密码学会青年人才奖", year: "2021" }],
        courses: { undergraduate: ["网络安全基础"], graduate: ["高级系统安全"] },
      },
    ),
    post: null,
  },
  {
    id: "m07",
    avatar: avatar07,
    alumni: "南京大学 博士",
    views: 936,
    info: withExtras(
      {
        profile: {
          fullName: "胡 翰林",
          title: "副教授 / 博士生导师",
          college: "数据科学与工程学院",
          email: "huhl@univ.edu.cn",
          homepage: "",
        },
        educations: [
          { id: "e1", school: "南京大学", degree: "博士", major: "计算机科学", period: "2013-2018" },
        ],
        horizontal: [],
        vertical: [
          { id: "v1", name: "大规模图数据挖掘", source: "国家自然科学基金面上项目", code: "62XXXXXX", role: "项目负责人", period: "2022-2025", description: "" },
        ],
        directions: ["数据挖掘", "图神经网络", "推荐系统"],
        studentRequirements: "数学基础扎实,熟悉常见机器学习算法。",
      },
      {
        mentorTypes: ["硕士生导师", "博士生导师"],
        workExperiences: [{ id: "w1", organization: "本校 数据学院", position: "副教授", period: "2019-至今" }],
        papers: [
          { id: "p1", title: "Scalable Graph Neural Networks for Recommendation", publishedAt: "KDD 2024", url: "https://arxiv.org/abs/2406.00001" },
          { id: "p2", title: "Heterogeneous GNNs Revisited", publishedAt: "WWW 2023" },
        ],
        courses: { undergraduate: ["数据挖掘"], graduate: ["图神经网络"] },
      },
    ),
    post: {
      title: "2026 级 图神经网络方向 硕士研究生招生",
      batch: "2026 级硕士",
      quota: "2",
      degreeType: "硕士",
      deadline: "2026-04-30",
      directions: ["图神经网络", "推荐系统"],
      majorRequirement: "计算机、数学、统计学相关专业",
      degreeRequirement: "本科及以上",
      abilityRequirements: "扎实的概率统计与编程基础。",
      bonus: "顶会论文、数据竞赛奖项",
      workContent: "大规模图数据上的表示学习与下游应用研究。",
      contact: "huhl@univ.edu.cn",
      remark: "",
    },
  },
  {
    id: "m08",
    avatar: avatar08,
    alumni: "哈尔滨工业大学 博士",
    views: 308,
    info: withExtras(
      {
        profile: {
          fullName: "林 婉清",
          title: "讲师 / 硕士生导师",
          college: "计算机科学与技术学院",
          email: "linwq@univ.edu.cn",
          homepage: "",
        },
        educations: [
          { id: "e1", school: "哈尔滨工业大学", degree: "博士", major: "人机交互", period: "2018-2023" },
        ],
        horizontal: [],
        vertical: [],
        directions: ["人机交互", "可视化", "无障碍计算"],
        studentRequirements: "热爱设计与研究,对 HCI 真正感兴趣。",
      },
      {
        mentorTypes: ["硕士生导师"],
        workExperiences: [{ id: "w1", organization: "本校 计算机学院", position: "讲师", period: "2023-至今" }],
        papers: [
          { id: "p1", title: "Accessible Data Visualization for Low-Vision Users", publishedAt: "CHI 2024", url: "https://arxiv.org/abs/2402.00777" },
        ],
        courses: { undergraduate: ["人机交互"], graduate: [] },
      },
    ),
    post: null,
  },
];

export function getMentorById(id: string): MentorPublicItem | undefined {
  return mentorList.find((m) => m.id === id);
}
