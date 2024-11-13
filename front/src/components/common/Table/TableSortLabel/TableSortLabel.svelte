<script lang="ts">
	import type { TableRootProps } from "./types";

  let { children, sortDirection = 'asc', column, onSortChange }: TableRootProps = $props();

  const toggleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    onSortChange(newDirection, column);
  };
</script>

<button class="table-sort-label" onclick={toggleSort}>
  {@render children()}

  {#if sortDirection === 'asc'}
    ▲
  {:else}
    ▼
  {/if}
</button>