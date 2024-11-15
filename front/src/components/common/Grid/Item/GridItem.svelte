<script lang="ts">
	import { SPACING_FACTOR } from "$lib/tokens";
	import { fromPixelToRem } from "$lib/utils/style";
    import type { GridItemProps } from "./types";
    import './style.css';

    let {
        children,
        classes = '',
        margin = 0,
        gap = 0,
        direction = 'ROW',
        justifyContent = 'space-between',
        alignItems = 'center',
        wrap = 'WRAP',
    }: GridItemProps = $props();

    const customStyle = `
        gap: ${fromPixelToRem(gap * SPACING_FACTOR)}rem;
        margin: ${fromPixelToRem(margin * SPACING_FACTOR)}rem;
        flex-direction: ${direction.toLowerCase()};
        justify-content: ${justifyContent.toLowerCase()};
        align-items: ${alignItems.toLowerCase()};
        flex-wrap: ${wrap.toLowerCase()};
    `
</script>

<div class="grid-item {classes}" style={customStyle}>
    {@render children()}
</div>