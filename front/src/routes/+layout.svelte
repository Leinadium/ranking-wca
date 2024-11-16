<script lang="ts">
	import Footer from '../components/common/Footer.svelte';
	import GridRoot from '../components/common/Grid/Root/GridRoot.svelte';
	import GlobalHeader from '../components/common/Header/GlobalHeader.svelte';
	import './main.css';
	
	let { children } = $props();
</script>

<GlobalHeader />

<main>
	<GridRoot marginH={8} gap={2}>
		{@render children?.()}
	</GridRoot>
</main>

<Footer />