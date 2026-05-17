import type {
  BatchInfo,
  NotificationItem,
  QuickAction,
  StatusBlockData,
  StudentStage,
  TodoItem,
} from "./types";

// 切换此值预览不同阶段：incomplete / filling / reviewing / completed
const STAGE = "filling" as StudentStage;

const subtitleMap: Record<StudentStage, string> = {
  incomplete: "请先完善个人信息，准备参加导师双选。",
  filling: "当前批次已开放，请按时完成导师志愿填报。",
  reviewing: "你的志愿已提交，请耐心等待导师审核结果。",
  completed: "你已完成导师双选，可继续查看沟通记录与培养反馈。",
};

const stageLabelMap: Record<StudentStage, string> = {
  incomplete: "资料完善中",
  filling: "第一轮填报中",
  reviewing: "导师录取中",
  completed: "双选已完成",
};

export const studentHomeMock = {
  stage: STAGE,
  greeting: "你好，欢迎进入研究生导师双选系统",
  subtitle: subtitleMap[STAGE],
  batch: {
    name: "2026级硕士研究生导师双选",
    stageLabel: stageLabelMap[STAGE],
    deadline: "学生填报截止：2026-06-10 18:00",
  } satisfies BatchInfo,
  profileCompletion: 80,
  quickActions: [
    {
      id: "profile",
      title: "完善个人资料",
      description: "补充基本信息、研究方向、学术成果与联系方式。",
      cta: "立即完善",
      icon: "UserRound",
      highlight: STAGE === "incomplete",
    },
    {
      id: "resume",
      title: "上传个人简历",
      description: "上传用于导师查看的简历附件，支持 PDF 格式。",
      cta: "上传简历",
      icon: "FileText",
    },
    {
      id: "create",
      title: "创建导师志愿",
      description: "根据招生方向与研究兴趣选择意向导师并提交志愿。",
      cta: "创建志愿",
      icon: "Sparkles",
      highlight: STAGE === "filling",
    },
    {
      id: "progress",
      title: "查看志愿进度",
      description: "查看当前志愿状态、导师审核结果与轮次进展。",
      cta: "查看进度",
      icon: "GitBranch",
    },
    {
      id: "chat",
      title: "联系导师",
      description: "通过站内消息或邮件通知与导师保持沟通。",
      cta: "立即沟通",
      icon: "MessagesSquare",
    },
    {
      id: "mentor",
      title: "查看我的导师",
      description: "双选完成后查看已确认导师及后续安排。",
      cta: "查看详情",
      icon: "GraduationCap",
      disabled: STAGE !== "completed",
    },
  ] satisfies QuickAction[],
  todos: [
    {
      id: "t1",
      text: "请在 6 月 10 日 18:00 前完成第一轮志愿填报",
      time: "剩余 3 天",
      priority: "high",
      cta: "去处理",
    },
    {
      id: "t2",
      text: "你的个人资料尚未完善，暂无法提交志愿",
      priority: "high",
      cta: "立即完善",
    },
    {
      id: "t3",
      text: "导师张教授向你发送了面试邀约，请及时确认",
      time: "1 小时前",
      priority: "medium",
      cta: "查看详情",
    },
    {
      id: "t4",
      text: "你的第二志愿已进入导师审核阶段",
      time: "今天",
      priority: "low",
      cta: "查看详情",
    },
  ] satisfies TodoItem[],
  progress: {
    round: "第一轮",
    submitted: 2,
    total: 3,
    items: [
      { rank: "第一志愿", mentor: "张教授", status: "to-review" as const, statusLabel: "待审核" },
      { rank: "第二志愿", mentor: "李教授", status: "to-review" as const, statusLabel: "待审核" },
      { rank: "第三志愿", mentor: "未填报", status: "not-started" as const, statusLabel: "未填报" },
    ],
    finalMentor: null as string | null,
  },
  notifications: {
    system: [
      { id: "s1", text: "第一轮导师双选已正式开启，请在规定时间内提交志愿", time: "今天 09:00", unread: true },
      { id: "s2", text: "导师面试时间已更新，请及时确认", time: "昨天 18:30" },
    ] satisfies NotificationItem[],
    chat: [
      { id: "c1", text: "张教授已查看你的申请资料", time: "30 分钟前", unread: true },
      { id: "c2", text: "你收到一条新的站内消息", time: "2 小时前", unread: true },
    ] satisfies NotificationItem[],
  },
  sidebarStatus: [
    { title: "当前双选阶段", value: "第一轮志愿填报中", hint: "请在截止前完成提交", status: "in-progress" },
    { title: "资料完成度", value: "80%", hint: "还需补充研究方向说明", status: "to-review" },
    { title: "导师状态", value: "当前尚未确认导师", hint: "等待第一轮审核", status: "to-review" },
    { title: "消息状态", value: "未读消息 3", hint: "待处理通知 2", status: "to-review", ctaLabel: "进入消息" },
  ] satisfies StatusBlockData[],
};
