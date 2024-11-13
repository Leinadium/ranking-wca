<script lang="ts">
	import { SPACING_FACTOR } from "$lib/tokens";
	import { fromPixelToRem } from "$lib/utils/style";
    import type { GridRootProps } from "./types";

    let { children, margin = 0, gap = 0 }: GridRootProps = $props();

    const customStyle = `
        gap: ${fromPixelToRem(gap * SPACING_FACTOR)}rem;
        margin: ${fromPixelToRem(margin * SPACING_FACTOR)}rem;
    `
</script>

<div class="grid" style={customStyle}>
    {@render children()}
</div>

<style>
    @import './style.css';
</style>