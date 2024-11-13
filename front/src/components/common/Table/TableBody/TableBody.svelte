<script lang="ts">
	import type { TableRootProps } from "./types";
    import './style.css';

    let { children }: TableRootProps = $props();
</script>

<tbody class="table-body">
    {@render children()}
</tbody>