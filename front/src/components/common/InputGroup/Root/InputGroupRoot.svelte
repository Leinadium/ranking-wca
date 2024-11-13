<script lang="ts">
    import type { InputGroupRootProps } from "./types";

    let { children }: InputGroupRootProps = $props();
</script>

<!-- TODO: Criar componente de grid -->
<div class="input-group">
    {@render children()}
</div>

<style>
    @import './style.css';
</style>