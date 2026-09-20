import { App, PluginSettingTab, Setting } from "obsidian";
import type TaskGanttDashboardPlugin from "./main";

export class SettingsTab extends PluginSettingTab {
  plugin: TaskGanttDashboardPlugin;

  constructor(app: App, plugin: TaskGanttDashboardPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "任务甘特仪表盘 - 设置" });

    containerEl.createEl("h3", { text: "通用设置" });
    new Setting(containerEl)
      .setName("数据来源文件夹")
      .setDesc("读取任务、打卡、语录的根目录，留空读取全部库")
      .addText(text => text
        .setValue(this.plugin.settings.sourceFolder)
        .onChange(async (v) => {
          this.plugin.settings.sourceFolder = v;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("文件名日期格式")
      .setDesc("默认为 YYYY‑MM‑DD")
      .addText(text => text
        .setValue(this.plugin.settings.filenameDateFormat)
        .onChange(async (v) => {
          this.plugin.settings.filenameDateFormat = v;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("每周第一天")
      .addDropdown(drop => drop
        .addOption("sunday", "周日")
        .addOption("monday", "周一")
        .setValue(this.plugin.settings.weekStartDay)
        .onChange(async (v: "sunday" | "monday") => {
          this.plugin.settings.weekStartDay = v;
          await this.plugin.saveSettings();
        }));

    containerEl.createEl("h3", { text: "甘特图 & 四象限设置" });
    new Setting(containerEl)
      .setName("事项默认写入标题")
      .setDesc("拖拽新增任务存放的笔记标题，默认 # 日程")
      .addText(text => text
        .setValue(this.plugin.settings.defaultTaskHeading)
        .onChange(async (v) => {
          this.plugin.settings.defaultTaskHeading = v;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("灰色化已完成日程")
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.grayCompleted)
        .onChange(async (v) => {
          this.plugin.settings.grayCompleted = v;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("透明化已完成日程")
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.opacityCompleted)
        .onChange(async (v) => {
          this.plugin.settings.opacityCompleted = v;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("忽略已完成多少天前任务")
      .setDesc("单位：天，默认15")
      .addText(text => text
        .setValue(String(this.plugin.settings.ignoreCompletedDays))
        .onChange(async (v) => {
          const num = parseInt(v) || 15;
          this.plugin.settings.ignoreCompletedDays = num;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("父任务完成忽略未完成子任务")
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.ignoreSubIfParentDone)
        .onChange(async (v) => {
          this.plugin.settings.ignoreSubIfParentDone = v;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("日视图拖拽对齐模式")
      .addDropdown(drop => drop
        .addOption("exact", "精确模式(1分钟)")
        .addOption("fiveMin", "5分钟整点对齐")
        .setValue(this.plugin.settings.dayViewDragSnapMode)
        .onChange(async (v: "exact" | "fiveMin") => {
          this.plugin.settings.dayViewDragSnapMode = v;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("年月周视图‑按完成状态排序")
      .addDropdown(drop => drop
        .addOption("undoneFirst", "未完成优先")
        .addOption("doneFirst", "已完成优先")
        .setValue(this.plugin.settings.ymwsortByDone)
        .onChange(async (v: "undoneFirst" | "doneFirst") => {
          this.plugin.settings.ymwsortByDone = v;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("年月周视图‑按开始日期排序")
      .addDropdown(drop => drop
        .addOption("earliestFirst", "从早到晚")
        .addOption("latestFirst", "从晚到早")
        .setValue(this.plugin.settings.ymwsortByStart)
        .onChange(async (v: "earliestFirst" | "latestFirst") => {
          this.plugin.settings.ymwsortByStart = v;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("年月周视图‑按时间跨度排序")
      .addDropdown(drop => drop
        .addOption("longFirst", "长跨度优先")
        .addOption("shortFirst", "短跨度优先")
        .setValue(this.plugin.settings.ymwsortBySpan)
        .onChange(async (v: "longFirst" | "shortFirst") => {
          this.plugin.settings.ymwsortBySpan = v;
          await this.plugin.saveSettings();
        }));

    containerEl.createEl("h3", { text: "打卡设置" });
    new Setting(containerEl)
      .setName("打卡记录默认标题")
      .setDesc("读取打卡的笔记标题，默认 # 打卡")
      .addText(text => text
        .setValue(this.plugin.settings.checkinDefaultHeading)
        .onChange(async (v) => {
          this.plugin.settings.checkinDefaultHeading = v;
          await this.plugin.saveSettings();
        }));

    containerEl.createEl("h3", { text: "悬浮计时器" });
    new Setting(containerEl)
      .setName("启用悬浮计时器")
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableTimer)
        .onChange(async (v) => {
          this.plugin.settings.enableTimer = v;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName("启用计时器音效")
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableTimerSound)
        .onChange(async (v) => {
          this.plugin.settings.enableTimerSound = v;
          await this.plugin.saveSettings();
        }));
  }
}
