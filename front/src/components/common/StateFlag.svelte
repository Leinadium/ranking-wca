<script lang="ts">
	import { stateIdToPng } from '$lib/utils';
	let { stateId = 'RJ' } = $props();
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
