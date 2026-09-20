import { Plugin, ItemView, WorkspaceLeaf } from "obsidian";
import type { TaskDashboardSettings } from "./types";
import { DEFAULT_SETTINGS } from "./types";
import { TaskDashboardSettingTab } from "./settings";
import DashboardView from "./components/DashboardView.svelte";

export const VIEW_ID = "task‑dashboard‑view";

export default class TaskDashboardPlugin extends Plugin {
  settings!: TaskDashboardSettings;
  view: DashboardView | null = null;
  statusBarItem: HTMLElement | null = null;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new TaskDashboardSettingTab(this.app, this));

    this.registerView(
      VIEW_ID,
      (leaf: WorkspaceLeaf) => {
        const view = new ItemView(leaf);
        view.getViewType = () => VIEW_ID;
        view.getDisplayText = () => "Task Dashboard";
        view.getIcon = () => "calendar‑clock";

        const container = view.containerEl.children[1];
        container.empty();

        this.view = new DashboardView({
          target: container,
          props: {
            plugin: this,
          },
        });

        return view;
      }
    );

    this.addRibbonIcon("calendar‑clock", "Open Task Dashboard", () => {
      this.activateView();
    });

    this.applyTimerStatus();
  }

  onunload() {
    if (this.view) {
      this.view.$destroy();
    }
    if (this.statusBarItem) {
      this.statusBarItem.remove();
    }
  }

  async activateView() {
    const { app } = this;
    let leaf: WorkspaceLeaf | null = null;
    const existing = app.workspace.getLeavesOfType(VIEW_ID);
    if (existing.length > 0) {
      leaf = existing[0];
    } else {
      leaf = app.workspace.getRightLeaf(false);
      if (!leaf) return;
      await leaf.setViewState({ type: VIEW_ID, active: true });
    }
    app.workspace.revealLeaf(leaf);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  applyTimerStatus() {
    if (this.settings.enableStatusTimer) {
      if (!this.statusBarItem) {
        this.statusBarItem = this.addStatusBarItem();
        this.statusBarItem.setText("⏱ Timer");
      }
    } else {
      if (this.statusBarItem) {
        this.statusBarItem.remove();
        this.statusBarItem = null;
      }
    }
  }
}
