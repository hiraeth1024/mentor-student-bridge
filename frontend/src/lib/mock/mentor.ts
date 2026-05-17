import type {
  BatchInfo,
  MentorStage,
  NotificationItem,
  QuickAction,
  StatusBlockData,
  TodoItem,
} from "./types";

const STAGE = "reviewing" as MentorStage;

const subtitleMap: Record<MentorStage, string> = {
  unpublished: "请先完善导师信息并发布招生方向。",
  filling: "当前批次正在进行中，请关注学生申请情况。",
  reviewing: "请及时查看学生申请并完成录取操作。",
  completed: "当前批次双选已完成，可查看最终录取结果与后续沟通。",
};

const stageLabelMap: Record<MentorStage, string> = {
  unpublished: "招生发布中",
  filling: "学生填报中",
  reviewing: "导师录取中",
  completed: "双选已完成",
};

export const mentorHomeMock = {
  stage: STAGE,
  greeting: "欢迎进入研究生导师双选系统",
  subtitle: subtitleMap[STAGE],
  batch: {
    name: "2026级硕士研究生导师双选",
    stageLabel: stageLabelMap[STAGE],
    deadline: "剩余名额 2 / 总名额 5",
  } satisfies BatchInfo,
  quickActions: [
    {
      id: "profile",
      title: "完善导师信息",
      description: "补充导师简介、研究方向、招生要求与联系方式。",
      cta: "立即完善",
      icon: "UserRound",
    },
    {
      id: "publish",
      title: "发布招生方向",
      description: "设置研究方向、招生名额与对学生的基本要求。",
      cta: "立即发布",
      icon: "Megaphone",
      highlight: STAGE === "unpublished",
    },
    {
      id: "applications",
      title: "查看学生申请",
      description: "查看学生简历、研究意向与志愿申请信息。",
      cta: "查看申请",
      icon: "Inbox",
      highlight: STAGE === "reviewing",
    },
    {
      id: "interview",
      title: "安排线上面试",
      description: "与意向学生沟通面试时间并发送通知。",
      cta: "安排面试",
      icon: "Video",
    },
    {
      id: "decision",
      title: "处理录取结果",
      description: "根据志愿轮次完成审核、录取或不录取操作。",
      cta: "去处理",
      icon: "CheckCircle2",
    },
    {
      id: "students",
      title: "查看我的学生",
      description: "查看已确认录取的学生名单与当前培养关系。",
      cta: "查看名单",
      icon: "Users",
    },
  ] satisfies QuickAction[],
  todos: [
    { id: "m1", text: "第一轮共有 12 名学生填报了你", time: "本批次", priority: "high", cta: "查看全部申请" },
    { id: "m2", text: "3 份申请待审核", priority: "high", cta: "立即审核" },
    { id: "m3", text: "2 名学生待发送面试通知", priority: "medium", cta: "去处理" },
    { id: "m4", text: "1 名学生已完成面试，待确认录取结果", priority: "medium", cta: "确认结果" },
  ] satisfies TodoItem[],
  enrollment: {
    directions: 3,
    totalQuota: 5,
    accepted: 2,
    remaining: 3,
    round: "第二轮录取中",
  },
  notifications: {
    system: [
      { id: "ms1", text: "系统提醒：第二轮录取将于 6 月 15 日截止", time: "今天 08:00", unread: true },
    ] satisfies NotificationItem[],
    chat: [
      { id: "mc1", text: "王同学向你发送了一条咨询消息", time: "20 分钟前", unread: true },
      { id: "mc2", text: "李同学已确认面试时间", time: "1 小时前", unread: true },
    ] satisfies NotificationItem[],
  },
  sidebarStatus: [
    { title: "当前招生进度", value: "第二轮录取中", hint: "请按时完成本轮录取处理", status: "in-progress" },
    { title: "指导名额", value: "剩余 3 个名额", hint: "共设置 5 个招生名额", status: "to-review" },
    { title: "待审核申请", value: "3 份", hint: "请尽快处理", status: "to-review", ctaLabel: "立即处理" },
    { title: "消息状态", value: "未读消息 4", hint: "待确认面试 2", status: "to-review", ctaLabel: "进入沟通" },
  ] satisfies StatusBlockData[],
};
