<script lang="ts">
	import type { TableRootProps } from "./types";
    import './style.css';

    let { children }: TableRootProps = $props();
</script>

<thead class="table-head">
    {@render children()}
</thead>