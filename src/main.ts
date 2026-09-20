import { Plugin, View, WorkspaceLeaf } from "obsidian";
import App from "./App.svelte";
import { SettingsTab } from "./settings-tab";

export const VIEW_TYPE_TASK_DASHBOARD = "task‑gantt‑dashboard‑view";

export interface PluginSettings {
  sourceFolder: string;
  filenameDateFormat: string;
  weekStartDay: "sunday" | "monday";

  defaultTaskHeading: string;
  tagConfigList: Array<{ tagName: string; color: string }>;
  grayCompleted: boolean;
  opacityCompleted: boolean;
  ignoreCompletedDays: number;
  ignoreSubIfParentDone: boolean;
  dayViewDragSnapMode: "exact" | "fiveMin";
  ymwsortByDone: "undoneFirst" | "doneFirst";
  ymwsortByStart: "earliestFirst" | "latestFirst";
  ymwsortBySpan: "longFirst" | "shortFirst";

  checkinDefaultHeading: string;
  checkinItems: Array<{ name: string; startTime: string }>;

  enableTimer: boolean;
  enableTimerSound: boolean;
}

export const DEFAULT_SETTINGS: PluginSettings = {
  sourceFolder: "",
  filenameDateFormat: "YYYY‑MM‑DD",
  weekStartDay: "sunday",

  defaultTaskHeading: "# 日程",
  tagConfigList: [
    { tagName: "重要而且紧急", color: "#e53935" },
    { tagName: "重要但不紧急", color: "#fdd835" },
    { tagName: "紧急但不重要", color: "#43a047" },
    { tagName: "不重要不紧急", color: "#757575" }
  ],
  grayCompleted: true,
  opacityCompleted: false,
  ignoreCompletedDays: 15,
  ignoreSubIfParentDone: true,
  dayViewDragSnapMode: "exact",
  ymwsortByDone: "undoneFirst",
  ymwsortByStart: "earliestFirst",
  ymwsortBySpan: "longFirst",

  checkinDefaultHeading: "# 打卡",
  checkinItems: [],

  enableTimer: true,
  enableTimerSound: true
};

export class TaskDashboardView extends View {
  component?: App;
  settings: PluginSettings;

  constructor(leaf: WorkspaceLeaf, settings: PluginSettings) {
    super(leaf);
    this.settings = settings;
  }

  getViewType() {
    return VIEW_TYPE_TASK_DASHBOARD;
  }

  getDisplayText() {
    return "任务甘特仪表盘";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    this.component = new App({
      target: container,
      props: {
        settings: this.settings
      }
    });
  }

  async onClose() {
    this.component?.$destroy();
  }
}

export default class TaskGanttDashboardPlugin extends Plugin {
  settings!: PluginSettings;

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async onload() {
    await this.loadSettings();

    this.registerView(
      VIEW_TYPE_TASK_DASHBOARD,
      (leaf) => new TaskDashboardView(leaf, this.settings)
    );

    this.addRibbonIcon("bar‑chart‑2", "打开任务甘特仪表盘", () => {
      this.activateView();
    });

    this.addCommand({
      id: "open‑task‑dashboard",
      name: "打开任务甘特仪表盘侧边栏",
      callback: () => {
        this.activateView();
      }
    });

    // 修复：静态导入，不再用await import动态加载
    this.addSettingTab(new SettingsTab(this.app, this));
  }

  async activateView() {
    const { workspace } = this.app;
    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_TASK_DASHBOARD);

    if (leaves.length > 0) {
      leaf = leaves[0];
    } else {
      leaf = workspace.getRightLeaf(false);
      if (!leaf) return;
      await leaf.setViewState({ type: VIEW_TYPE_TASK_DASHBOARD, active: true });
    }
    workspace.revealLeaf(leaf);
  }

  onunload() {
  }
}
