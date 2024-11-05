<script lang="ts">
	import Footer from '../components/common/Footer.svelte';
	import Header from '../components/common/Header.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com"/>
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
		rel="stylesheet"
	/>

	<link rel="stylesheet" href="https://icons.cubing.net/css/cubing-icons.css" />
</svelte:head>

<div id="body-inner">
	<Header />
	<main>
		{@render children?.()}
	</main>
	<Footer />
</div>

<style>
	#body-inner {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		min-height: 100vh;
		margin: 0 !important;
		padding: 0;
		border: 0;
		position: relative;

		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;

		background-color: var(--color-white);
	}

	@media (min-width: 768px) {
		main {
			padding-left: 5%;
			padding-right: 5%;
			width: 750px;
		}
	}
	@media (min-width: 992px) {
		main {
			padding-left: 10%;
			padding-right: 10%;
			width: 970px;
		}
	}

	@media (min-width: 1200px) {
		main {
			padding-left: 15%;
			padding-right: 15%;
			width: 1170px;
		}
	}

	@media screen and (max-width: 767px) {
		main {
			padding: 0;
			width: 100%;
			overflow-y: hidden;
		}
	}

	main {
		box-sizing: border-box;
		height: 100%;
		/* width: 100%; */
		margin: 0;
		border: 0;
		padding: 0;
		flex-grow: 20;

		font-family:
			'Roboto',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
	}

	:global(html) {
		--color-white: #fff;
		--color-lightgray: #f8f8f8;
		--color-mediumgray: #e9e9e9;
	}
</style>
