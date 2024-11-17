<script lang="ts">
	import type { TableCellProps } from "./types";
	import Typography from "../../Typography/Typography.svelte";
	import GridItem from "../../Grid/Item/GridItem.svelte";
    import './style.css';

    let {
        children,
        isHeader = false,
        isFooter = false,
        isHighlighted = false,
        colspan,
    }: TableCellProps = $props();
    const normalCellColor = isHeader ? 'NEUTRAL_DARK_2' : 'NEUTRAL_DARK_1'
    const CUSTOM_CLASSES = {
        HEADER: 'table__header-cell',
        FOOTER: 'table__cell--footer',
        HIGHLIGHT: 'table__cell--highlighted',
    }
    const customClassesList = [
        isHeader ? CUSTOM_CLASSES.HEADER : '',
        isFooter ? CUSTOM_CLASSES.FOOTER : '',
        isHighlighted ? CUSTOM_CLASSES.HIGHLIGHT : '',
    ]
</script>

<td class="table__cell {customClassesList.join(' ').trim()}" {colspan}>
    {#if isFooter} 
        <GridItem justifyContent={'end'}>
            {@render children()}
        </GridItem>
    {:else}
        <Typography
            color={isHighlighted ? 'ACCENT_POSITIVE_DARK_2' : normalCellColor}
            type={isHeader ? 'bodyTwo' : 'bodyOne'}
        >
            {@render children()}
        </Typography>
    {/if}
</td>