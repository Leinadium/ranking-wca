<script lang="ts">
	import GridItem from '../../Grid/Item/GridItem.svelte';
	import type { ButtonGroupRootProps } from './types';

	let { children, ...props }: ButtonGroupRootProps = $props();
</script>

<GridItem classes={'button-group'} justifyContent={'flex-start'}>
	{@render children()}
</GridItem>
