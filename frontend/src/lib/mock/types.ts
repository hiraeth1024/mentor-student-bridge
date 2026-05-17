export type StatusKind =
  | "not-started"
  | "in-progress"
  | "incomplete"
  | "to-submit"
  | "to-review"
  | "to-interview"
  | "to-confirm"
  | "accepted"
  | "rejected"
  | "completed";

export type StudentStage = "incomplete" | "filling" | "reviewing" | "completed";
export type MentorStage = "unpublished" | "filling" | "reviewing" | "completed";

export interface BatchInfo {
  name: string;
  stageLabel: string;
  deadline?: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  cta: string;
  icon: string;
  highlight?: boolean;
  disabled?: boolean;
}

export interface TodoItem {
  id: string;
  text: string;
  time?: string;
  priority: "high" | "medium" | "low";
  cta: string;
}

export interface NotificationItem {
  id: string;
  text: string;
  time: string;
  unread?: boolean;
}

export interface StatusBlockData {
  title: string;
  value: string;
  hint?: string;
  status?: StatusKind;
  ctaLabel?: string;
}
