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
        isFullWidth = false,
    }: GridItemProps = $props();

    const formattedMargin = typeof margin === 'string' ? margin : `${fromPixelToRem(margin * SPACING_FACTOR)}rem`
    const customStyle = `
        gap: ${fromPixelToRem(gap * SPACING_FACTOR)}rem;
        margin: ${formattedMargin};
        flex-direction: ${direction.toLowerCase()};
        justify-content: ${justifyContent.toLowerCase()};
        align-items: ${alignItems.toLowerCase()};
        flex-wrap: ${wrap.toLowerCase()};
        width: ${isFullWidth ? '100%' : 'auto'};
    `
</script>

<div class="grid-item {classes}" style={customStyle}>
    {@render children()}
</div>