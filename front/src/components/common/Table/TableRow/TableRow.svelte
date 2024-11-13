<script lang="ts">
	import type { TableRootProps } from "./types";
    import './style.css';

    let { children, isHeader = false }: TableRootProps = $props();
</script>

<tr class="table-row">
    {@render children()}
</tr>