<script lang="ts">
	import GridItem from '../Grid/Item/GridItem.svelte';
	import Typography from '../Typography/Typography.svelte';
	import './style.css';

	const emailContact = 'wca@leinadium.dev'
</script>

<footer>
	<GridItem direction={'COLUMN'} justifyContent={'center'} alignItems={'center'} gap={1} margin={4}>
		<Typography
			type={'caption'}
			color={'NEUTRAL_DARK_1'}
			align={'center'}
		>
			<a target="_blank" href="https://github.com/Leinadium/ranking-wca">
				<img class="footer__icon" src="/icons/github-mark.svg" alt="Github" />
			</a>
			|
			<a target="_blank" href="https://leinadium.dev">Daniel Guimarães</a>
			e
			<a target="_blank" href="https://www.jeannelima.com.br/">Jeanne Lima</a>
			| 2025
			<br/>
			Contato: <a target="_blank" href={`mailto:${emailContact}`}>{emailContact}</a> 
		</Typography>
	</GridItem>
</footer>
