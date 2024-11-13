<script lang="ts">
	import type { TableContainerProps } from "./types";
    import './style.css';

    let { children }: TableContainerProps = $props();
</script>

<div class="table-container">
    {@render children()}
</div>