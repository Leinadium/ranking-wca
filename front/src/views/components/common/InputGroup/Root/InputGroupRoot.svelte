<script lang="ts">
	import GridItem from "../../Grid/Item/GridItem.svelte";
    import type { InputGroupRootProps } from "./types";

    let { children }: InputGroupRootProps = $props();
</script>

<GridItem
    classes={'input-group'}
    direction={'COLUMN'}
    alignItems={'flex-start'}
    gap={1}
>
    {@render children()}
</GridItem>