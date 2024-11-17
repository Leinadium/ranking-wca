<script lang="ts">
	import type { TableRowProps } from "./types";
    import './style.css';

    let {
        children,
        isHeader = false,
        isFooter = false,
        isHighlighted = false,
    }: TableRowProps = $props();
    const CUSTOM_CLASSES = {
        HEADER: 'table__row--header',
        FOOTER: 'table__row--footer',
        HIGHLIGHT: 'table-highlight-row',
    }
    const customClassesList = [
        isHeader ? CUSTOM_CLASSES.HEADER : '',
        isFooter ? CUSTOM_CLASSES.FOOTER : '',
        isHighlighted ? CUSTOM_CLASSES.HIGHLIGHT : '',
    ]
</script>

<tr class="table__row {customClassesList.join(' ').trim()}">
    {@render children()}
</tr>