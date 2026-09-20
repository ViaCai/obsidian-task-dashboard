<script lang="ts">
  import type { PluginSettings } from "./main";

  export let settings: PluginSettings;

  let activeTab: "gantt" | "quadrant" | "checkin" | "quote" = "gantt";

  const tabList = [
    { key: "gantt", label: "甘特图" },
    { key: "quadrant", label: "待办四象限" },
    { key: "checkin", label: "打卡" },
    { key: "quote", label: "每日语录" }
  ] as const;
</script>

<div class="dashboard‑root">
  <div class="tab‑bar">
    {#each tabList as tab}
      <button
        class:tab‑active={activeTab === tab.key}
        on:click={() => activeTab = tab.key}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <div class="tab‑content">
    {#if activeTab === "gantt"}
      <div class="placeholder‑panel">
        <h3>甘特图（阶段1占位）</h3>
        <p>下一阶段接入笔记解析后显示任务甘特视图</p>
      </div>
    {:else if activeTab === "quadrant"}
      <div class="placeholder‑panel">
        <h3>待办四象限（阶段1占位）</h3>
        <p>下一阶段接入笔记解析后渲染四象限</p>
      </div>
    {:else if activeTab === "checkin"}
      <div class="placeholder‑panel">
        <h3>打卡热力图（阶段1占位）</h3>
        <p>下一阶段读取#打卡数据渲染热力图</p>
      </div>
    {:else if activeTab === "quote"}
      <div class="placeholder‑panel">
        <h3>每日语录（阶段1占位）</h3>
        <p>下一阶段读取#语录展示周/月语录列表</p>
      </div>
    {/if}
  </div>
</div>

<style>
.dashboard‑root {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 8px;
  gap: 8px;
}

.tab‑bar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tab‑bar button {
  border: 1px solid var(--background‑modifier‑border);
  background: var(--background‑secondary);
  color: var(--text‑normal);
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 13px;
  cursor: pointer;
}

.tab‑bar button.tab‑active {
  background: var(--interactive‑accent);
  color: var(--text‑on‑accent);
}

.tab‑content {
  flex‑grow: 1;
  overflow‑y: auto;
}

.placeholder‑panel {
  padding: 16px;
  color: var(--text‑muted);
  text‑align: center;
}
</style>
