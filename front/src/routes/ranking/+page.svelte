<script lang="ts">
	import Button from "../../components/common/Button/Button.svelte";
	import ButtonGroup from "../../components/common/ButtonGroup/ButtonGroup.svelte";
	import GridItem from "../../components/common/GridItem/GridItem.svelte";
	import InputGroup from "../../components/common/InputGroup/InputGroup.svelte";
	import InputLabel from "../../components/common/InputLabel/InputLabel.svelte";
	import PageTitle from "../../components/common/PageTitle/PageTitle.svelte";
	import Select from "../../components/common/Select/Select.svelte";
	import Typography from "../../components/common/Typography/Typography.svelte";

	//TODO: Consumir dados da API
	const lastUpdatedAt = '2024-11-09T00:00:15Z'
	const stateOptions = [
		{
			label: 'Todos',
			value: null,
		},
		{
			label: 'Rio de Janeiro',
			value: 'RJ',
		},
		{
			label: 'São Paulo',
			value: 'SP',
		},
	]
	const typeOptions = [
		{
			label: 'Tempo único',
			value: 'single',
		},
		{
			label: 'Média',
			value: 'average',
		},
	]
</script>

<GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={1}>
	<PageTitle text={'Rankings'} />
	<Typography type={'caption'} color={'NEUTRAL_DARK_1'}>
		Última atualização: {lastUpdatedAt}
	</Typography>
</GridItem>

<GridItem direction={'ROW'} justifyContent={'start'} gap={4}>
	<InputGroup>
		<InputLabel text={'Evento'} />
		<ButtonGroup>
			<Button type="OUTLINED" color="PRIMARY" icon={'Ícone 1'} />
			<Button type="OUTLINED" color="PRIMARY" icon={'Ícone 2'} />
			<Button type="OUTLINED" color="PRIMARY" icon={'Ícone 3'} />
			<Button type="OUTLINED" color="PRIMARY" icon={'Ícone 4'} />
		</ButtonGroup>
	</InputGroup>
	
	<InputGroup>
		<InputLabel text={'Estado'} />
		<Select options={stateOptions} />
	</InputGroup>
	
	<InputGroup>
		<InputLabel text={'Tipo'} />
		<Select options={typeOptions} />
	</InputGroup>
</GridItem>