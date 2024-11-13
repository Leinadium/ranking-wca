<script lang="ts">
	import type { TableRootProps } from "./types";
    import './style.css';

    let { children }: TableRootProps = $props();
</script>

<table class="table-base">
    {@render children()}
</table>