<script lang="ts">
	import type { StateFlagProps } from '../../types/common/props';
	import { stateIdToPng } from '$lib/utils';
	
	let { stateId = 'RJ' }: StateFlagProps = $props();
</script>

<img src={stateIdToPng(stateId.toLowerCase())} alt={stateId} />

<style>
	img {
		object-fit: contain;

		height: 100%;
		padding: 0;
		margin: 0;
	}
</style>
