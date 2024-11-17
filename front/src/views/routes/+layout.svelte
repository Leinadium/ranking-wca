<script lang="ts">
	import Footer from '../components/common/Footer.svelte';
	import GridRoot from '../components/common/Grid/Root/GridRoot.svelte';
	import GlobalHeader from '../components/common/Header/GlobalHeader.svelte';
	import Sidebar from '../components/common/Sidebar/Sidebar.svelte';
	import type { RootLayoutProps } from './types';
	import { loadUpdateStatus } from '../../viewModels/update';
	import { onMount } from 'svelte';
	import './main.css';

	let { children }: RootLayoutProps = $props();

	const isSidebarExpanded = true;
	const mainCustomStyle = `
		width: ${isSidebarExpanded ? 'calc(100vw - 340px)' : 'calc(100vw - 64px)'};
		margin: 0 ${isSidebarExpanded ? '340px' : '64px'};
	`

	onMount(() => {
		loadUpdateStatus();
	});
</script>

<Sidebar isExpanded={isSidebarExpanded} />

<main style={mainCustomStyle}>
	<GlobalHeader />

	<GridRoot marginH={8} gap={2}>
		{@render children?.()}
	</GridRoot>

	<Footer />
</main>
