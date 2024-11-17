<script lang="ts">
	import type { TableBodyProps } from "./types";
    import './style.css';
    
    let { children }: TableBodyProps = $props();
</script>

<tbody class="table__body">
    {@render children()}
</tbody>