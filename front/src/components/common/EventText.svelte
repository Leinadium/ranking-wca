<script lang="ts">
	import { EVENT_NAMES } from '$lib/consts';
	let { id = '333' } = $props();
	let [text, className] = EVENT_NAMES[id];
</script>

<span class="event-text">
	<span class="cubing-icon {className}"></span>
	<span class="event-text-text">{text}</span>
</span>

<style>
	.event-text {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: 0.2rem;
	}
	.event-text-text {
		font-weight: 400;
	}
</style>
