<script lang="ts">
	import GridItem from "../../components/common/Grid/Item/GridItem.svelte";
	import PageTitle from "../../components/common/PageTitle/PageTitle.svelte";
	import Typography from "../../components/common/Typography/Typography.svelte";
	import TableContainer from "../../components/common/Table/TableContainer/TableContainer.svelte";
	import TableBase from "../../components/common/Table/TableBase/TableBase.svelte";
	import TableHead from "../../components/common/Table/TableHead/TableHead.svelte";
	import TableRow from "../../components/common/Table/TableRow/TableRow.svelte";
	import TableCell from "../../components/common/Table/TableCell/TableCell.svelte";
	import TableBody from "../../components/common/Table/TableBody/TableBody.svelte";
	import TableFooter from "../../components/common/Table/TableFooter/TableFooter.svelte";
	import TablePagination from "../../components/common/Table/TablePagination/TablePagination.svelte";
	import { filterDataByPage } from "$lib/utils/pagination";
	import Flag from "../../components/common/Flag/Flag.svelte";
	import { INTERNAL_ROUTES } from "$lib/constants/routes";
	import ButtonRoot from "../../components/common/Button/Root/ButtonRoot.svelte";
	import ButtonText from "../../components/common/Button/Text/ButtonText.svelte";
	import { updateStore } from "../../../stores/update";
	import { toLocalFormat } from "$lib/utils/timestamps";
	import { STATE_NAMES } from "$lib/constants/location";
	import TableFilters from "../../components/common/TableFilters/TableFilters.svelte";
	import { BRAND_NAME } from "$lib/utils/general";
	import {onMount} from "svelte";
	import { loadRanking } from "../../../viewModels/ranking";
	import type { RankingTableData, RankingTableFiltersProps } from "./types";
	import { rankingStore } from "../../../stores/ranking";
	
	// TODO: Implementar filtros
    export const tableFilters: RankingTableFiltersProps = $state({
		eventId: '333',
		stateId: 'RJ',
		competitionMode: 'single',
	});
	const formattedLastUpdatedAt = $derived(toLocalFormat($updateStore.lastUpdatedAt));
	let rankingTableData: RankingTableData = $state({
		totalItems: 0,
		itemsPerPage: 10,
		currentPage: 1,
		paginatedData: [],
	});

	function handlePageChange(newPage: number) {
		rankingTableData.currentPage = newPage;
	};

	$effect(() => {
        rankingTableData.paginatedData = filterDataByPage(
            $rankingStore.items,
            rankingTableData.currentPage,
            rankingTableData.itemsPerPage
        )
	})

	$effect(() => {
        rankingTableData.totalItems = $rankingStore.totalItems
	})

	onMount(async () => {
		await loadRanking({
			mode: tableFilters.competitionMode,
			eventId: tableFilters.eventId,
			stateId: tableFilters.stateId,
			page: rankingTableData.currentPage - 1,
			itensPerPage: rankingTableData.itemsPerPage,
		})
	});
</script>

<svelte:head>
	<title>Ranking | {BRAND_NAME}</title>
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
				<TableCell isHeader>Posição</TableCell>
				<TableCell isHeader >Nome</TableCell>
				<TableCell isHeader>ID da WCA</TableCell>
				<TableCell isHeader>Resultado</TableCell>
				<TableCell isHeader>Representando</TableCell>
				<TableCell isHeader>Competição</TableCell>
			</TableRow>
		</TableHead>

		<TableBody>
			{#each rankingTableData.paginatedData as row}
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
							{#if row?.stateId}
								<Flag stateId={row?.stateId} size={2} />
								{STATE_NAMES?.[row?.stateId]}
							{/if}
						</GridItem>
					</TableCell>
					<TableCell>
						{#if row?.competitionState}
							<Flag stateId={row?.competitionState} size={2} />
						{/if}
						{row?.competitionName}
					</TableCell>
				</TableRow>
			{/each}
		</TableBody>

		<TableFooter>
			<TableRow isFooter>
				<TableCell isFooter colspan={6}>
					{#key `${rankingTableData.currentPage}-${rankingTableData.totalItems}-${rankingTableData.itemsPerPage}`}
						<TablePagination
							currentPage={rankingTableData.currentPage}
							totalItems={rankingTableData.totalItems}
							itemsPerPage={rankingTableData.itemsPerPage}
							onPageChange={handlePageChange}
						/>
					{/key}
				</TableCell>
			</TableRow>
		</TableFooter>
	</TableBase>
</TableContainer>