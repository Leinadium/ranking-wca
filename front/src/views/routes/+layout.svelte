<script lang="ts">
	import Footer from '../components/common/Footer.svelte';
	import GridRoot from '../components/common/Grid/Root/GridRoot.svelte';
	import GlobalHeader from '../components/common/Header/GlobalHeader.svelte';
	import Sidebar from '../components/common/Sidebar/Sidebar.svelte';
	import type { RootLayoutProps } from './types';
	import { loadUpdateStatus } from '../../viewModels/update';
	import { onMount } from 'svelte';
	import { sidebar } from '$lib/states/sidebar.svelte';
	import './main.css';

	let { children }: RootLayoutProps = $props();

	const mainCustomStyle = $derived(`
		width: ${sidebar.isExpanded ? 'calc(100vw - 352px)' : 'calc(100vw - 64px)'};
		margin: 0 ${sidebar.isExpanded ? '352px' : '64px'};
	`)

	onMount(() => {
		loadUpdateStatus();
	});
</script>

<Sidebar />

<main style={mainCustomStyle}>
	<GlobalHeader />

	<GridRoot marginH={8} gap={2}>
		{@render children?.()}
	</GridRoot>

	<Footer />
</main>
