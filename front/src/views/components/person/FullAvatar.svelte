<script lang="ts">
	import { STATE_NAMES } from '$lib/consts';
	import ImageAvatar from './ImageAvatar.svelte';
	import StateFlag from '../common/StateFlag.svelte';

	let { name = 'Daniel Guimarães', wcaId = '2018GUIM02', stateId = 'RJ' } = $props();
</script>

<div class="main-avatar">
	<h2 class="name">
		{name}
		<a href="https://worldcubeassociation.org/persons/{wcaId}">
			<img src="/icons/wca-logo.svg" alt="wca" />
		</a>
	</h2>
	<h6 class="code">{wcaId}</h6>
	<span class="state">
		{STATE_NAMES[stateId] || 'Sem estado'}
		<StateFlag {stateId} />
	</span>
	<div class="image">
		<ImageAvatar {wcaId} />
	</div>
</div>

<style>
	.main-avatar {
		box-sizing: border-box;
		height: 50dvh;
		min-width: 50%;

		display: flex;
		flex-flow: column nowrap;
		justify-content: start;
		align-items: center;
	}

	.name {
		font-weight: 600;
		font-size: 1.71428571rem;
		margin-bottom: 0;
		margin-top: 0;

		height: 1.8rem;
	}

	h2.name {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	h6 {
		margin-bottom: 0;
	}

	a,
	img {
		height: 90%;
	}

	.code {
		font-weight: 400;
		font-size: 0.8rem;
		margin-top: 0;
	}

	.state {
		height: 1rem;
		margin: 0.5rem;

		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		border-radius: 0.3rem;
		background-color: #f8f8f8;
	}

	.image {
		margin-top: 1rem;
		margin-bottom: 1rem;

		height: 100%;
		min-height: 0;
		width: 100%;

		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
	}
</style>
