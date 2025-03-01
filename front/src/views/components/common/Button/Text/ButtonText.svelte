<script lang="ts">
	import { DEFAULT_BUTTON_SIZE } from '$lib/constants/components/Button';
	import Typography from '../../Typography/Typography.svelte';
	import type { ButtonTextProps } from './types';

	let { children, size = DEFAULT_BUTTON_SIZE, ...props }: ButtonTextProps = $props();
</script>

<Typography {...props} type={size === 'SMALL' ? 'buttonSmall' : 'buttonDefault'}>
	{@render children()}
</Typography>
