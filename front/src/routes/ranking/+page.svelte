<script lang="ts">
	import ButtonGroupRoot from "../../components/common/ButtonGroup/Root/ButtonGroupRoot.svelte";
	import ButtonGroupItem from "../../components/common/ButtonGroup/Item/ButtonGroupItem.svelte";
	import GridItem from "../../components/common/Grid/Item/GridItem.svelte";
	import InputGroupRoot from "../../components/common/InputGroup/Root/InputGroupRoot.svelte";
	import InputGroupLabel from "../../components/common/InputGroup/Label/InputGroupLabel.svelte";
	import PageTitle from "../../components/common/PageTitle/PageTitle.svelte";
	import Select from "../../components/common/Select/Select.svelte";
	import Typography from "../../components/common/Typography/Typography.svelte";
	import ButtonGroupIcon from "../../components/common/ButtonGroup/Icon/ButtonGroupIcon.svelte";
	import TableContainer from "../../components/common/Table/TableContainer/TableContainer.svelte";
	import TableBase from "../../components/common/Table/TableBase/TableBase.svelte";
	import TableHead from "../../components/common/Table/TableHead/TableHead.svelte";
	import TableRow from "../../components/common/Table/TableRow/TableRow.svelte";
	import TableCell from "../../components/common/Table/TableCell/TableCell.svelte";
	import TableSortLabel from "../../components/common/Table/TableSortLabel/TableSortLabel.svelte";
	import TableBody from "../../components/common/Table/TableBody/TableBody.svelte";
	import TableFooter from "../../components/common/Table/TableFooter/TableFooter.svelte";
	import TablePagination from "../../components/common/Table/TablePagination/TablePagination.svelte";
	import { paginate } from "$lib/utils/pagination";
	import Flag from "../../components/common/Flag/Flag.svelte";
	import FontIcon from "../../components/common/Icon/Font/FontIcon.svelte";
	import Tooltip from "../../components/common/Tooltip/Tooltip.svelte";

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
	// TODO: Rota de ranking precisa retornar "stateId"
	let tableData: any = $state({
		data: [
			{
				wcaId: "2017TESC01",
				name: "Pedro xxxxx",
				best: 15.91,
				ranking: 1,
				times: [10.91, 11.91, -1, 13.04, 56.10],
				registered: false,
				compName: "Brasileiro 2024",
				stateId: "SP",
			},
			{
				wcaId: "2018GUIM02",
				name: "Daniel xxxxx",
				best: 20.12,
				ranking: 2,
				times: [10.00, 12.00, 14.00, 16.00, 18.00],
				registered: true,
				compName: "Planetario 2023",
				stateId: null,
			},
			{
				wcaId: "2017TESC01",
				name: "Renan xxxxx",
				best: 15.91,
				ranking: 3,
				times: [10.91, 11.91, -1, 13.04, 56.10],
				registered: false,
				compName: "Brasileiro 2024",
				stateId: "RJ",
			},
			{
				wcaId: "2018GUIM02",
				name: "Mateus xxxxx",
				best: 20.12,
				ranking: 4,
				times: [10.00, 12.00, 14.00, 16.00, 18.00],
				registered: true,
				compName: "Planetario 2023",
				stateId: "AC",
			},
			{
				wcaId: "2017TESC01",
				name: "Suzana xxxxx",
				best: 15.91,
				ranking: 5,
				times: [10.91, 11.91, -1, 13.04, 56.10],
				registered: false,
				compName: "Brasileiro 2024",
				stateId: "MG",
			},
			{
				wcaId: "2018GUIM02",
				name: "Maria xxxxx",
				best: 20.12,
				ranking: 6,
				times: [10.00, 12.00, 14.00, 16.00, 18.00],
				registered: true,
				compName: "Planetario 2023",
				stateId: "PB",
			},
			{
				wcaId: "2017TESC01",
				name: "Gustavo xxxxx",
				best: 15.91,
				ranking: 7,
				times: [10.91, 11.91, -1, 13.04, 56.10],
				registered: false,
				compName: "Brasileiro 2024",
				stateId: "SP",
			},
			{
				wcaId: "2018GUIM02",
				name: "Guilherme xxxxx",
				best: 20.12,
				ranking: 8,
				times: [10.00, 12.00, 14.00, 16.00, 18.00],
				registered: true,
				compName: "Planetario 2023",
				stateId: "ES",
			},
		],
		currentPage: 1,
		itemsPerPage: 3,
		sortDirection: 'asc',
		sortColumn: 'ranking',
		sortedData: [],
		paginatedData: [],
		totalPages: 0
	});

  	$effect(() => {
		tableData.sortedData = [...tableData.data].sort((a, b) => {
			const valueA = a[tableData.sortColumn];
			const valueB = b[tableData.sortColumn];

			// Se os valores forem strings, usa localeCompare
			if (typeof valueA === 'string' && typeof valueB === 'string') {
				if (tableData.sortDirection === 'asc') {
				return valueA.localeCompare(valueB); // Ascending order
				} else {
				return valueB.localeCompare(valueA); // Descending order
				}
			}

			// Se os valores forem números, use comparação numérica
			if (typeof valueA === 'number' && typeof valueB === 'number') {
				if (tableData.sortDirection === 'asc') {
				return valueA - valueB; // Ordem crescente
				} else {
				return valueB - valueA; // Ordem decrescente
				}
			}

			// Se os valores forem de tipos mistos ou não comparáveis considera todos iguais
			return 0;
		});
	})

	$effect(() => {
		tableData.totalPages = Math.ceil(tableData.sortedData.length / tableData.itemsPerPage);
		tableData.paginatedData = paginate(tableData.sortedData, tableData.currentPage, tableData.itemsPerPage);
	})

	const onPageChange = (newPage: number) => {
		tableData.currentPage = newPage;
	};

	const onSortChange = (newDirection: 'asc' | 'desc', column: string) => {
		tableData.sortDirection = newDirection;
		tableData.sortColumn = column;
	};
</script>

<svelte:head>
	<title>Ranking | Cubos Estaduais</title>
</svelte:head>

<GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={1}>
	<PageTitle text={'Ranking'} />
	<Typography type={'caption'} color={'NEUTRAL_DARK_1'}>
		Última atualização: {lastUpdatedAt}
	</Typography>
</GridItem>

<GridItem direction={'ROW'} justifyContent={'start'} alignItems={'flex-start'} gap={4}>
	<InputGroupRoot>
		<InputGroupLabel text={'Evento'} />
		<ButtonGroupRoot>
			{#each eventFiltersOptions as event}
				<Tooltip text={event.name}>
					<ButtonGroupItem type="OUTLINED" color="PRIMARY">
						<ButtonGroupIcon>
							<FontIcon name={event.icon} />
						</ButtonGroupIcon>
					</ButtonGroupItem>
				</Tooltip>
			{/each}
		</ButtonGroupRoot>
	</InputGroupRoot>
	
	<InputGroupRoot>
		<InputGroupLabel text={'Estado'} />
		<Select options={stateFilterOptions} />
	</InputGroupRoot>
	
	<InputGroupRoot>
		<InputGroupLabel text={'Tipo'} />
		<Select options={typeFilterOptions} />
	</InputGroupRoot>
</GridItem>

<TableContainer>
	<TableBase>
		<TableHead>
			<TableRow isHeader>
				<TableCell isHeader>
					<TableSortLabel sortDirection={tableData.sortDirection} column={tableData.sortColumn} onSortChange={onSortChange}>
						#
					</TableSortLabel>
				</TableCell>
				<TableCell isHeader >Nome</TableCell>
				<TableCell isHeader>ID da WCA</TableCell>
				<TableCell isHeader>Resultado</TableCell>
				<TableCell isHeader>Representando</TableCell>
				<TableCell isHeader>Competição</TableCell>
			</TableRow>
		</TableHead>

		<TableBody>
			{#each tableData.paginatedData as row}
				<TableRow>
					<TableCell>{row?.ranking}</TableCell>
					<!-- TODO: Permitir clicar no nome e ser redirecionado para a página da pessoa -->
					<TableCell>{row?.name}</TableCell>
					<TableCell>{row?.wcaId}</TableCell>
					<TableCell>{row?.best}</TableCell>
					<TableCell>
						<Flag stateId={row?.stateId} size={2} />
					</TableCell>
					<!-- TODO: Exibir bandeira do campeonato -->
					<TableCell>{row?.compName}</TableCell>
				</TableRow>
			{/each}
		</TableBody>

		<TableFooter>
			<TableRow isFooter>
				<TableCell isFooter colspan={6}>
					<TablePagination currentPage={tableData.currentPage} totalPages={tableData.totalPages} onPageChange={onPageChange} />
				</TableCell>
			</TableRow>
		</TableFooter>
	</TableBase>
</TableContainer>