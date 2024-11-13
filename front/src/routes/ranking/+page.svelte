<script lang="ts">
	import ButtonGroupRoot from "../../components/common/ButtonGroup/Root/ButtonGroupRoot.svelte";
	import ButtonGroupItem from "../../components/common/ButtonGroup/Item/ButtonGroupItem.svelte";
	import GridItem from "../../components/common/Grid/Item/GridItem.svelte";
	import InputGroupRoot from "../../components/common/InputGroup/Root/InputGroupRoot.svelte";
	import InputGroupLabel from "../../components/common/InputGroup/Label/InputGroupLabel.svelte";
	import PageTitle from "../../components/common/PageTitle/PageTitle.svelte";
	import Select from "../../components/common/Select/Select.svelte";
	import Typography from "../../components/common/Typography/Typography.svelte";
	import ButtonGroupText from "../../components/common/ButtonGroup/Text/ButtonGroupText.svelte";
	import ButtonGroupIcon from "../../components/common/ButtonGroup/Icon/ButtonGroupIcon.svelte";

	//TODO: Consumir dados da API
	const lastUpdatedAt = '2024-11-09T00:00:15Z'
	const eventFiltersOptions = [
		{
			icon: 'cubing-icon event-333',
			name: 'Cubo 3x3x3',
			value: '',
		},
		{
			icon: 'cubing-icon event-222',
			name: 'Cubo 2x2x2',
			value: '',
		},
		{
			icon: 'cubing-icon event-444',
			name: 'Cubo 4x4x4',
			value: '',
		},
		{
			icon: 'cubing-icon event-555',
			name: 'Cubo 5x5x5',
			value: '',
		},
		{
			icon: 'cubing-icon event-666',
			name: 'Cubo 6x6x6',
			value: '',
		},
		{
			icon: 'cubing-icon event-777',
			name: 'Cubo 7x7x7',
			value: '',
		},
		{
			icon: 'cubing-icon event-333bf',
			name: '3x3x3 vendado',
			value: '',
		},
		{
			icon: 'cubing-icon event-333fm',
			name: '3x3x3 em menos movimentos',
			value: '',
		},
		{
			icon: 'cubing-icon event-333oh',
			name: '3x3x3 com uma mão',
			value: '',
		},
		{
			icon: 'cubing-icon event-clock',
			name: 'Clock',
			value: '',
		},
		{
			icon: 'cubing-icon event-minx',
			name: 'Megaminx',
			value: '',
		},
		{
			icon: 'cubing-icon event-pyram',
			name: 'Pyraminx',
			value: '',
		},
		{
			icon: 'cubing-icon event-skewb',
			name: 'Skewb',
			value: '',
		},
		{
			icon: 'cubing-icon event-sq1',
			name: 'Square-1',
			value: '',
		},
		{
			icon: 'cubing-icon event-444bf',
			name: '4x4x4 vendado',
			value: '',
		},
		{
			icon: 'cubing-icon event-555bf',
			name: '5x5x5 vendado',
			value: '',
		},
		{
			icon: 'cubing-icon event-333mbf',
			name: '3x3x3 múltiplos cubos vendado',
			value: '',
		},
	]
	const stateFilterOptions = [
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
	const typeFilterOptions = [
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

<GridItem direction={'ROW'} justifyContent={'start'} alignItems={'flex-start'} gap={4}>
	<InputGroupRoot>
		<InputGroupLabel text={'Evento'} />
		<ButtonGroupRoot>
			{#each eventFiltersOptions as event}
				<ButtonGroupItem type="OUTLINED" color="PRIMARY">
					<ButtonGroupIcon name={event.icon} />
				</ButtonGroupItem>
			{/each}
		</ButtonGroupRoot>
	</InputGroupRoot>
	
	<InputGroupRoot>
		<InputGroupLabel text={'Estado'} />
		<Select options={stateFilterOptions} />
	</InputGroupRoot>
	
	<InputGroupRoot>
		<InputGroupLabel text={'Tipo'} />
		<ButtonGroupRoot>
			{#each typeFilterOptions as type}
				<ButtonGroupItem type="OUTLINED" color="PRIMARY">
					<ButtonGroupText>{type.label}</ButtonGroupText>
				</ButtonGroupItem>
			{/each}
		</ButtonGroupRoot>
	</InputGroupRoot>
</GridItem>