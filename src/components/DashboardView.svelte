<script lang="ts">
  import type TaskDashboardPlugin from "../main";

  export let plugin: TaskDashboardPlugin;

  type TabKey = "gantt" | "eisenhower" | "checkin" | "quote";
  let activeTab: TabKey = "gantt";
</script>

<div class="task‑dashboard‑root">
  <div class="tab‑header">
    <button class:active={activeTab === 'gantt'} on:click={()=>activeTab='gantt'}>甘特图</button>
    <button class:active={activeTab === 'eisenhower'} on:click={()=>activeTab='eisenhower'}>四象限</button>
    <button class:active={activeTab === 'checkin'} on:click={()=>activeTab='checkin'}>打卡</button>
    <button class:active={activeTab === 'quote'} on:click={()=>activeTab='quote'}>语录</button>
  </div>

  <div class="panel‑content">
    {#if activeTab === 'gantt'}
      <div class="placeholder">甘特图面板（待实现）</div>
    {:else if activeTab === 'eisenhower'}
      <div class="placeholder">四象限待办（待实现）</div>
    {:else if activeTab === 'checkin'}
      <div class="placeholder">打卡热力图（待实现）</div>
    {:else if activeTab === 'quote'}
      <div class="placeholder">每日语录（待实现）</div>
    {/if}
  </div>
</div>

<style>
.task‑dashboard‑root {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.tab‑header {
  display: flex;
  gap:4px;
  flex-wrap: wrap;
  padding: 8px;
}
.tab‑header button {
  padding:4px 8px;
  border-radius:4px;
  border:1px solid var(--background‑modifier‑border);
  background:var(--background‑secondary);
}
.tab‑header button.active {
  background:var(--interactive‑accent);
  color:white;
}
.panel‑content {
  flex‑grow:1;
  overflow‑y:auto;
  padding:8px;
}
.placeholder {
  color:var(--text‑muted);
  text‑align:center;
  margin‑top:40px;
}
</style>
