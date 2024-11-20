<script lang="ts">
	import Footer from '../components/common/Footer/Footer.svelte';
	import GridRoot from '../components/common/Grid/Root/GridRoot.svelte';
	import GlobalHeader from '../components/common/Header/GlobalHeader.svelte';
	import Sidebar from '../components/common/Sidebar/Sidebar.svelte';
	import type { RootLayoutProps } from './types';
	import { loadUpdateStatus } from '../../viewModels/update';
	import { onMount } from 'svelte';
	import './main.css';

	let { children }: RootLayoutProps = $props();

	const mainCustomStyle = $derived(`
		width: 100%;
	`)

	onMount(() => {
		loadUpdateStatus();
	});
</script>

<Sidebar />

<div class="container">	
	<GlobalHeader />
	
	<main style={mainCustomStyle}>
		<GridRoot marginH={8} gap={2}>
			{@render children?.()}
		</GridRoot>
	</main>
	
	<Footer />
</div>