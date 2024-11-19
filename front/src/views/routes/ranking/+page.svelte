<script lang="ts">
	import GridItem from "../../components/common/Grid/Item/GridItem.svelte";
	import PageTitle from "../../components/common/PageTitle/PageTitle.svelte";
	import Typography from "../../components/common/Typography/Typography.svelte";
	import TableContainer from "../../components/common/Table/TableContainer/TableContainer.svelte";
	import TableBase from "../../components/common/Table/TableBase/TableBase.svelte";
	import TableHead from "../../components/common/Table/TableHead/TableHead.svelte";
	import TableRow from "../../components/common/Table/TableRow/TableRow.svelte";
	import TableCell from "../../components/common/Table/TableCell/TableCell.svelte";
	import TableSortLabel from "../../components/common/Table/TableSortLabel/TableSortLabel.svelte";
	import TableBody from "../../components/common/Table/TableBody/TableBody.svelte";
	import TableFooter from "../../components/common/Table/TableFooter/TableFooter.svelte";
	import TablePagination from "../../components/common/Table/TablePagination/TablePagination.svelte";
	import { filterDataByPage } from "$lib/utils/pagination";
	import Flag from "../../components/common/Flag/Flag.svelte";
	import { sortObjectList } from "$lib/utils/sort";
	import { INTERNAL_ROUTES } from "$lib/constants/routes";
	import ButtonRoot from "../../components/common/Button/Root/ButtonRoot.svelte";
	import ButtonText from "../../components/common/Button/Text/ButtonText.svelte";
	import { updateStore } from "../../../stores/update";
	import { toLocalFormat } from "$lib/utils/timestamps";
	import { STATE_NAMES } from "$lib/constants/location";
	import TableFilters from "../../components/common/TableFilters/TableFilters.svelte";
	
	const formattedLastUpdatedAt = $derived(toLocalFormat($updateStore.lastUpdatedAt));
	//TODO: Consumir dados da API
	let tableData: any = $state({
		data: [
			{
				wcaId: "2017SEMO02",
				name: "Marcos xxxxx",
				best: 15.91,
				ranking: 1,
				times: [10.91, 11.91, -1, 13.04, 56.10],
				registered: false,
				compName: "Brasileiro 2024",
				stateId: "SP",
			},
			{
				wcaId: "2017TESC01",
				name: "Pedro xxxxx",
				best: 15.91,
				ranking: 2,
				times: [10.91, 11.91, -1, 13.04, 56.10],
				registered: false,
				compName: "Brasileiro 2024",
				stateId: "RJ",
			},
			{
				wcaId: "2018GUIM02",
				name: "Daniel xxxxx",
				best: 20.12,
				ranking: 3,
				times: [10.00, 12.00, 14.00, 16.00, 18.00],
				registered: true,
				compName: "Planetario 2023",
				stateId: null,
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
		totalItems: 8,
		itemsPerPage: 3,
		currentPage: 1,
		sortDirection: 'asc',
		sortColumn: 'ranking',
		sortedData: [],
		paginatedData: [],
	});

	function handlePageChange(newPage: number) {
		tableData.currentPage = newPage;
	};

	function handleSortChange(newDirection: 'asc' | 'desc', column: string) {
		tableData.sortDirection = newDirection;
		tableData.sortColumn = column;
	};

  	$effect(() => {
		tableData.sortedData = sortObjectList<any>(tableData.data, tableData.sortColumn, tableData.sortDirection);
	})

	$effect(() => {
		tableData.paginatedData = filterDataByPage(tableData.sortedData, tableData.currentPage, tableData.itemsPerPage);
	})
</script>

<svelte:head>
	<title>Ranking | Cubos Estaduais</title>
</svelte:head>

<GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={1}>
	<PageTitle text={'Ranking'} />
	<Typography type={'caption'} color={'NEUTRAL_DARK_1'}>
		Última atualização: {formattedLastUpdatedAt}
	</Typography>
</GridItem>

<TableFilters />

<TableContainer>
	<TableBase>
		<TableHead>
			<TableRow isHeader>
				<TableCell isHeader>
					<TableSortLabel
						sortDirection={tableData.sortDirection}
						column={tableData.sortColumn}
						onSortChange={handleSortChange}
					>
						Posição
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
					<TableCell>
						<ButtonRoot
							type={'BASIC'}
							color={'NEUTRAL'}
							href={`${INTERNAL_ROUTES.PERSON}/${row?.wcaId}`}
						>
							<ButtonText>{row?.name}</ButtonText>
						</ButtonRoot>
					</TableCell>
					<TableCell>{row?.wcaId}</TableCell>
					<TableCell>{row?.best}</TableCell>
					<TableCell>
						<GridItem justifyContent={'flex-start'} gap={1}>
							<Flag stateId={row?.stateId} size={2} />
							{STATE_NAMES[row?.stateId]}
						</GridItem>
					</TableCell>
					<!-- TODO: Exibir bandeira do campeonato -->
					<TableCell>{row?.compName}</TableCell>
				</TableRow>
			{/each}
		</TableBody>

		<TableFooter>
			<TableRow isFooter>
				<TableCell isFooter colspan={6}>
					<TablePagination currentPage={tableData.currentPage} totalItems={tableData.totalItems} onPageChange={handlePageChange} />
				</TableCell>
			</TableRow>
		</TableFooter>
	</TableBase>
</TableContainer>