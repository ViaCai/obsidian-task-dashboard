# \# Task‑Dashboard

# Obsidian 综合任务面板插件：甘特图｜四象限待办｜打卡热力图｜每日语录｜状态栏计时器。

# 

# > ⚠️ 当前版本：早期开发骨架，大部分功能尚未实现，仅可加载预览UI框架。

# 

# \## 功能规划

# \- 📊 甘特图视图：解析 `@start` / `@end` 时间标记的任务，支持拖拽调整时间

# \- 🎯 四象限待办：按照「重要/紧急」自动分类任务

# \- ✅ 打卡热力图：阅读指定笔记的打卡记录，生成日历热力图

# \- 📜 每日语录：展示笔记库中收集的语录内容

# \- ⏱ 状态栏计时器：番茄计时，可写入笔记记录工作时长

# \- 📱 同时支持桌面端与移动端Obsidian

# 

# \## 安装方式

# \### 方式1：Release下载（推荐）

# 1\. 前往 \[Releases](https://github.com/ViaCai/obsidian-task-dashboard/releases)

# 2\. 下载 `main.js`、`manifest.json`、`styles.css`

# 3\. 在你的Obsidian库，进入 `.obsidian/plugins/task‑dashboard/`，放入上面3个文件

# 4\. 重启Obsidian，第三方插件开启 `Task Dashboard`

# 

# \### 方式2：BRAT插件开发安装

# 使用BRAT，填入仓库地址：`ViaCai/obsidian-task-dashboard`

# 

# \## 使用说明

# 1\. 插件设置中填写\*\*数据来源文件夹\*\*，指定存放任务、打卡、语录笔记的目录

# 2\. 点击侧边栏图标打开任务面板，切换不同Tab

# 

# \## 开发说明

# 本项目使用 Svelte + Typescript + Vite 构建，GitHub Actions云端编译。

# 

# ```bash

# \# 本地（可选，你可以完全使用云端编译）

# npm install

# npm run build



