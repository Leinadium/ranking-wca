<script lang="ts">
	import type { TableSortLabelProps } from "./types";

  let { children, sortDirection = 'asc', column, onSortChange }: TableSortLabelProps = $props();

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