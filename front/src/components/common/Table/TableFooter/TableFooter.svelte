<script lang="ts">
	import type { TableRootProps } from "./types";
    import './style.css';

    let { children }: TableRootProps = $props();
</script>

<tfoot class="table-footer">
    {@render children()}
</tfoot>