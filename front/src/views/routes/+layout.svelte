<script lang="ts">
	import Footer from '../components/common/Footer/Footer.svelte';
	import GridRoot from '../components/common/Grid/Root/GridRoot.svelte';
	import GlobalHeader from '../components/common/Header/GlobalHeader.svelte';
	import Sidebar from '../components/common/Sidebar/Sidebar.svelte';
	import type { RootLayoutProps } from './types';
	import { loadUpdateStatus } from '../../viewModels/update';
	import { onMount } from 'svelte';
	import './main.css';
	import { responsivenessStore } from '../../stores/responsiveness';

	let { children }: RootLayoutProps = $props();

	const mainCustomStyle = $derived(`
		width: 100%;
	`);

	const checkDeviceSize = () => {
		responsivenessStore.update((state) => ({
			...state,
			isSmallDevice: window.innerWidth < 800 || window.innerHeight < 600
		}));
	};

	onMount(() => {
		loadUpdateStatus();
		checkDeviceSize();
		window.addEventListener('resize', checkDeviceSize);

		return () => window.removeEventListener('resize', checkDeviceSize);
	});
</script>

<Sidebar />

<div class="container">
	<GlobalHeader />

	<main style={mainCustomStyle}>
		{#key $responsivenessStore.isSmallDevice}
			<GridRoot marginH={$responsivenessStore.isSmallDevice ? 4 : 8} gap={2}>
				{@render children?.()}
			</GridRoot>
		{/key}
	</main>

	<Footer />
</div>
