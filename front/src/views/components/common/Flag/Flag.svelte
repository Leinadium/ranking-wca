<script lang="ts">
	import { SPACING_FACTOR } from '$lib/tokens';
	import { stateIdToPng } from '$lib/utils';
	import type { FlagProps } from './types';

    let { stateId, size }: FlagProps = $props();
</script>

{#if stateId}
	<img src={stateIdToPng(stateId.toLowerCase())} alt={stateId} height={size * SPACING_FACTOR} width="auto" />
{/if}