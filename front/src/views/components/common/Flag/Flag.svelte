<script lang="ts">
	import { SPACING_FACTOR } from '$lib/tokens';
	import type { FlagProps } from './types';

	let { stateId, size }: FlagProps = $props();
</script>

{#if stateId}
	<img
		src={`/flags/${stateId.toLowerCase()}.png`}
		alt={stateId}
		height={size * SPACING_FACTOR}
		width="auto"
	/>
{/if}
