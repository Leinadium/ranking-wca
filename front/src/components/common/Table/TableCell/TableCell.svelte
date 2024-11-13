<script lang="ts">
	import type { TableRootProps } from "./types";
    import './style.css';

    let { children, isHeader = false, colspan }: TableRootProps = $props();
</script>

<td class="table-cell" {colspan}>
    {@render children()}
</td>