<script lang="ts">
    import type { InputGroupProps } from "./types";

    let { children }: InputGroupProps = $props();
</script>

<!-- TODO: Criar componente de grid -->
<div class="input-group">
    {@render children()}
</div>

<style>
    @import './style.css';
</style>