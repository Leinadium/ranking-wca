<script lang="ts">
	import GridItem from "./Grid/Item/GridItem.svelte";
	import Typography from "./Typography/Typography.svelte";
</script>

<footer>
	<GridItem direction={'COLUMN'} alignItems={'center'} gap={1}>
		<Typography type={'caption'} color={'NEUTRAL_DARK_1'}>
			<a target="_blank" href="https://github.com/Leinadium/ranking-wca">
				<img class="icon" src="/icons/github-mark.svg" alt="Github" />
			</a>
			 |
			<a target="_blank" href="https://leinadium.dev">Daniel Guimarães</a>
			e
			<a target="_blank" href="https://www.jeannelima.com.br/">Jeanne Lima</a>
			 | 2024
		</Typography>
	</GridItem>
</footer>

<style>
	footer {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}
	.icon {
		height: 0.812rem;
		aspect-ratio: 1 / 1;
	}
</style>
