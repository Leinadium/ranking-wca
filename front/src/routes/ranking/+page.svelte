<script lang="ts">
	import Button from "../../components/common/Button/Button.svelte";
	import ButtonGroup from "../../components/common/ButtonGroup/ButtonGroup.svelte";
	import Typography from "../../components/common/Typography/Typography.svelte";

	const lastUpdatedAt = '2024-11-09T00:00:15Z' //TODO: Consumir dado da API
</script>

<Typography type={'h2'} color={'NEUTRAL_DARK_2'}>Rankings</Typography>

<Typography type={'caption'} color={'NEUTRAL_DARK_1'}>
	Última atualização: {lastUpdatedAt}
</Typography>

<Typography type={'h6'} color={'NEUTRAL_DARK_2'}>Evento</Typography>

<ButtonGroup>
	<Button type="OUTLINED" color="PRIMARY" icon={'Ícone 1'} />
	<Button type="OUTLINED" color="PRIMARY" icon={'Ícone 2'} />
	<Button type="OUTLINED" color="PRIMARY" icon={'Ícone 3'} />
	<Button type="OUTLINED" color="PRIMARY" icon={'Ícone 4'} />
</ButtonGroup>