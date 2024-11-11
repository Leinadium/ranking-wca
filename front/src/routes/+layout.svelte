<script lang="ts">
	import Footer from '../components/common/Footer.svelte';
	import Grid from '../components/common/Grid/Grid.svelte';
	import Header from '../components/common/Header.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="https://icons.cubing.net/css/cubing-icons.css" />
</svelte:head>

<Header />

<main>
	<Grid margin={8} gap={2}>
		{@render children?.()}
	</Grid>
</main>

<Footer />