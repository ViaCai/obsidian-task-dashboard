import type { TaskDashboardSettings } from "./types";
import { DEFAULT_SETTINGS } from "./types";
import { App, PluginSettingTab, Setting } from "obsidian";
import type TaskDashboardPlugin from "./main";

export class TaskDashboardSettingTab extends PluginSettingTab {
  plugin: TaskDashboardPlugin;

  constructor(app: App, plugin: TaskDashboardPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "Task Dashboard 设置" });

    containerEl.createEl("h3", { text: "通用设置" });

    new Setting(containerEl)
      .setName("数据来源文件夹")
      .setDesc("插件读取任务、打卡、语录的根目录")
      .addText((text) =>
        text
          .setPlaceholder("例如：工作/任务")
          .setValue(this.plugin.settings.sourceFolder)
          .onChange(async (val) => {
            this.plugin.settings.sourceFolder = val;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("文件名日期格式")
      .setDesc("默认为 YYYY‑MM‑DD")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.filenameDateFormat)
          .onChange(async (val) => {
            this.plugin.settings.filenameDateFormat = val;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("每周第一天")
      .addDropdown((drop) =>
        drop
          .addOption("0", "周日")
          .addOption("1", "周一")
          .setValue(String(this.plugin.settings.weekStartDay))
          .onChange(async (val) => {
            this.plugin.settings.weekStartDay = Number(val);
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("h3", { text: "甘特图 & 四象限" });

    new Setting(containerEl)
      .setName("事项存放标题")
      .setDesc("待办任务默认写入的markdown标题")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.scheduleHeading)
          .onChange(async (val) => {
            this.plugin.settings.scheduleHeading = val;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("灰色化已完成日程")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.grayCompleted)
          .onChange(async (v) => {
            this.plugin.settings.grayCompleted = v;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("透明化已完成日程")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.transparentCompleted)
          .onChange(async (v) => {
            this.plugin.settings.transparentCompleted = v;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("忽略已完成多少天以前任务")
      .addText((txt) => {
        txt.inputEl.type = "number";
        txt.setValue(String(this.plugin.settings.ignoreCompletedDays)).onChange(async (v) => {
          const num = parseInt(v || "0");
          this.plugin.settings.ignoreCompletedDays = isNaN(num) ? 15 : num;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName("父任务完成后忽略未完成子任务")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.parentDoneIgnoreChild)
          .onChange(async (v) => {
            this.plugin.settings.parentDoneIgnoreChild = v;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("日视图拖拽对齐模式")
      .addDropdown((drop) =>
        drop
          .addOption("exact‑1min", "精确模式(1分钟)")
          .addOption("five‑min‑align", "整点模式(5分钟)")
          .setValue(this.plugin.settings.ganttDragSnapMode)
          .onChange(async (v) => {
            this.plugin.settings.ganttDragSnapMode = v as any;
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("h3", { text: "打卡设置" });
    new Setting(containerEl)
      .setName("打卡记录标题")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.checkinHeading)
          .onChange(async (val) => {
            this.plugin.settings.checkinHeading = val;
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("h3", { text: "悬浮计时器" });
    new Setting(containerEl)
      .setName("启用状态栏计时器")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.enableStatusTimer)
          .onChange(async (v) => {
            this.plugin.settings.enableStatusTimer = v;
            await this.plugin.saveSettings();
            this.plugin.applyTimerStatus();
          })
      );

    new Setting(containerEl)
      .setName("启用音效反馈")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.timerEnableSound)
          .onChange(async (v) => {
            this.plugin.settings.timerEnableSound = v;
            await this.plugin.saveSettings();
          })
      );
  }
}
