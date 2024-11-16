<script lang="ts">
	import { SPACING_FACTOR } from "$lib/tokens";
	import { fromPixelToRem } from "$lib/utils/style";
    import type { GridRootProps } from "./types";
    import './style.css';

    let { children, marginH = 0, marginV = 0, gap = 0 }: GridRootProps = $props();

    const customStyle = `
        gap: ${fromPixelToRem(gap * SPACING_FACTOR)}rem;
        margin: ${fromPixelToRem(marginV * SPACING_FACTOR)}rem ${fromPixelToRem(marginH * SPACING_FACTOR)}rem;
    `
</script>

<div class="grid" style={customStyle}>
    {@render children()}
</div>