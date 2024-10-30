<script lang="ts">
	import { onMount } from 'svelte';

	const url = 'https://www.worldcubeassociation.org/api/v0/persons/';

	let { wcaId = '' } = $props();
	let avatarUrl = $state('');

	async function load() {
		console.log('load!', wcaId);
		if (wcaId.match(/^\d{4}\w{4}\d{2}$/)) {
			console.log('match!');
			let payload = await fetch(url + wcaId);
			let data = await payload.json();

			avatarUrl = data.person.avatar.url || '';
		}
	}

	// $effect(() => {
	// 	if (avatarUrl) load();
	// });

	onMount(load);
</script>

{#if avatarUrl}
	<img src={avatarUrl} alt="avatar" />
{:else}
	<img class="missing" src="/missing.png" alt="empty-avatar" />
{/if}

<style>
	img {
		height: 100%;
		min-height: 0;

		object-fit: contain;
		padding: 0;
		margin: 0;
		border: 1px solid #777;
	}

	.missing {
		height: 60%;
		border: none;
	}
</style>
