<script lang="ts">
	import SvgIcon from '../Icon/SVG/SVGIcon.svelte';
	import Typography from '../Typography/Typography.svelte';
	import type { EmptyMessageProps } from './types';

	let { children, iconName = 'faXmark' }: EmptyMessageProps = $props();
</script>

<SvgIcon name={iconName} color={'NEUTRAL_DARK_1'} size={'2x'}></SvgIcon>
<Typography color={'NEUTRAL_DARK_1'} type={'bodyOne'} align={'center'}>
	{#if children}
		{@render children()}
	{:else}
		Não foram encontrados dados.
	{/if}
</Typography>
