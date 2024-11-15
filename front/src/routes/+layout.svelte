<script lang="ts">
	import Footer from '../components/common/Footer.svelte';
	import GridRoot from '../components/common/Grid/Root/GridRoot.svelte';
	import Header from '../components/common/Header.svelte';
	import './main.css';
	
	let { children } = $props();
</script>

<Header />

<main>
	<GridRoot margin={8} gap={2}>
		{@render children?.()}
	</GridRoot>
</main>

<Footer />