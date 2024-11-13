<script lang="ts">
	import ButtonGroupRoot from "../../components/common/ButtonGroup/Root/ButtonGroupRoot.svelte";
	import ButtonGroupItem from "../../components/common/ButtonGroup/Item/ButtonGroupItem.svelte";
	import GridItem from "../../components/common/Grid/Item/GridItem.svelte";
	import InputGroupRoot from "../../components/common/InputGroup/Root/InputGroupRoot.svelte";
	import InputGroupLabel from "../../components/common/InputGroup/Label/InputGroupLabel.svelte";
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
	<InputGroupRoot>
		<InputGroupLabel text={'Evento'} />
		<ButtonGroupRoot>
			<ButtonGroupItem type="OUTLINED" color="PRIMARY" icon={'Ícone 1'} />
			<ButtonGroupItem type="OUTLINED" color="PRIMARY" icon={'Ícone 2'} />
			<ButtonGroupItem type="OUTLINED" color="PRIMARY" icon={'Ícone 3'} />
			<ButtonGroupItem type="OUTLINED" color="PRIMARY" icon={'Ícone 4'} />
		</ButtonGroupRoot>
	</InputGroupRoot>
	
	<InputGroupRoot>
		<InputGroupLabel text={'Estado'} />
		<Select options={stateOptions} />
	</InputGroupRoot>
	
	<InputGroupRoot>
		<InputGroupLabel text={'Tipo'} />
		<Select options={typeOptions} />
	</InputGroupRoot>
</GridItem>