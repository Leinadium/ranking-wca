<script lang="ts">
	import type { ButtonGroupRootProps } from "./types";

    let { children }: ButtonGroupRootProps = $props();
</script>

<!-- TODO: Criar componente de grid -->
<div class="button-group">
    {@render children()}
</div>

<style>
    @import './style.css';
</style>