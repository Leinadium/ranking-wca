<script lang="ts">
	import GridItem from "../../Grid/Item/GridItem.svelte";
    import type { InputGroupRootProps } from "./types";
    import './styles.css'

    let { children, isFullWidth = false }: InputGroupRootProps = $props();
</script>

<GridItem
    classes={`input-group ${isFullWidth ? 'input-group--full-width' : ''}`}
    direction={'COLUMN'}
    alignItems={'flex-start'}
    gap={1}
    isFullWidth={isFullWidth}
>
    {@render children()}
</GridItem>