<script lang="ts">
    import type { CardProps } from "./types";
    import './style.css'

    let { children }: CardProps = $props();
</script>

<div class="card">
    {@render children?.()}
</div>