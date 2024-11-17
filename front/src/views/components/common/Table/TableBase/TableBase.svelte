<script lang="ts">
	import type { TableBaseProps } from "./types";
    import './style.css';

    let { children }: TableBaseProps = $props();
</script>

<table class="table__base">
    {@render children()}
</table>