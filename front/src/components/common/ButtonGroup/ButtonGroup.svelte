<script lang="ts">
	import type { ButtonGroupProps } from "./types";

    let { children }: ButtonGroupProps = $props();
</script>

<!-- TODO: Criar componente de grid -->
<div class="button-group">
    {@render children()}
</div>

<style>
    @import './style.css';
</style>