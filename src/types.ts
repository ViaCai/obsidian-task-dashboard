import type { Moment } from "moment";

export type TaskQuadrantType =
  | "important‑urgent"
  | "important‑noturgent"
  | "notimportant‑urgent"
  | "notimportant‑noturgent";

export interface TagColorItem {
  id: string;
  label: string;
  color: string;
  quadrant: TaskQuadrantType;
}

export interface TaskItem {
  id: string;
  rawText: string;
  completed: boolean;
  sourceFilePath: string;
  sourceFileDate: Moment;
  startTime: Moment | null;
  endTime: Moment | null;
  hasTimeOfDay: boolean;
  tagLabel: string | null;
  tagId: string | null;
  indent: number;
  children: TaskItem[];
  parent: TaskItem | null;
  line: number;
}

export interface CheckinProject {
  id: string;
  name: string;
  startDate: string;
  order: number;
}

export interface CheckinRecord {
  projectId: string;
  date: Moment;
  completed: boolean;
  sourceFilePath: string;
}

export interface QuoteItem {
  date: Moment;
  content: string;
  sourceFilePath: string;
}

export type TimerStatus = "idle" | "running" | "paused";
export interface TimerState {
  status: TimerStatus;
  startTime: number | null;
  pauseAccumMs: number;
  tag: string;
  description: string;
}

export interface TaskDashboardSettings {
  sourceFolder: string;
  filenameDateFormat: string;
  weekStartDay: number;

  scheduleHeading: string;
  tagColorList: TagColorItem[];
  grayCompleted: boolean;
  transparentCompleted: boolean;
  ignoreCompletedDays: number;
  parentDoneIgnoreChild: boolean;
  ganttDragSnapMode: "exact‑1min" | "five‑min‑align";
  ganttSortByComplete: "unfinished‑first" | "finished‑first";
  ganttSortByStart: "asc" | "desc";
  ganttSortByDuration: "long‑first" | "short‑first";

  checkinHeading: string;
  checkinProjects: CheckinProject[];

  enableStatusTimer: boolean;
  timerEnableSound: boolean;
}

export const DEFAULT_SETTINGS: TaskDashboardSettings = {
  sourceFolder: "",
  filenameDateFormat: "YYYY‑MM‑DD",
  weekStartDay: 0,

  scheduleHeading: "# 日程",
  tagColorList: [
    {
      id: "important‑urgent",
      label: "重要而且紧急",
      color: "#ef4444",
      quadrant: "important‑urgent",
    },
    {
      id: "important‑noturgent",
      label: "重要但不紧急",
      color: "#eab308",
      quadrant: "important‑noturgent",
    },
    {
      id: "notimportant‑urgent",
      label: "紧急但不重要",
      color: "#22c55e",
      quadrant: "notimportant‑urgent",
    },
    {
      id: "notimportant‑noturgent",
      label: "不重要不紧急",
      color: "#9ca3af",
      quadrant: "notimportant‑noturgent",
    },
  ],
  grayCompleted: true,
  transparentCompleted: false,
  ignoreCompletedDays: 15,
  parentDoneIgnoreChild: true,
  ganttDragSnapMode: "five‑min‑align",
  ganttSortByComplete: "unfinished‑first",
  ganttSortByStart: "asc",
  ganttSortByDuration: "long‑first",

  checkinHeading: "# 打卡",
  checkinProjects: [],

  enableStatusTimer: true,
  timerEnableSound: true,
};
