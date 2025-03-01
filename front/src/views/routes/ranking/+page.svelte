<script lang="ts">
	import GridItem from '../../components/common/Grid/Item/GridItem.svelte';
	import PageTitle from '../../components/common/PageTitle/PageTitle.svelte';
	import Typography from '../../components/common/Typography/Typography.svelte';
	import Table from '../../components/common/Table/Table/Table.svelte';
	import TableBase from '../../components/common/Table/TableBase/TableBase.svelte';
	import TableHead from '../../components/common/Table/TableHead/TableHead.svelte';
	import TableRow from '../../components/common/Table/TableRow/TableRow.svelte';
	import TableCell from '../../components/common/Table/TableCell/TableCell.svelte';
	import TableBody from '../../components/common/Table/TableBody/TableBody.svelte';
	import TableFooter from '../../components/common/Table/TableFooter/TableFooter.svelte';
	import TablePagination from '../../components/common/Table/TablePagination/TablePagination.svelte';
	import Flag from '../../components/common/Flag/Flag.svelte';
	import { INTERNAL_ROUTES } from '$lib/constants/routes';
	import ButtonRoot from '../../components/common/Button/Root/ButtonRoot.svelte';
	import ButtonText from '../../components/common/Button/Text/ButtonText.svelte';
	import { updateStore } from '../../../stores/update';
	import { toLocalFormat } from '$lib/utils/timestamps';
	import { STATE_NAMES } from '$lib/constants/location';
	import TableFilters from '../../components/common/TableFilters/TableFilters.svelte';
	import { BRAND_NAME } from '$lib/constants/general';
	import { onMount } from 'svelte';
	import { loadRanking } from '../../../viewModels/ranking';
	import type { RankingTableData, RankingTableFiltersProps } from './types';
	import { rankingStore } from '../../../stores/ranking';
	import EmptyMessage from '../../components/common/EmptyMessage/EmptyMessage.svelte';
	import { KEY_PERSISTED_RANKING_FILTERS } from '$lib/constants/ranking';

	// TODO: Definir valores padrões com base em valores centralizados para cada opção
	const persistedFilters = localStorage.getItem(KEY_PERSISTED_RANKING_FILTERS);
	let tableFilters: RankingTableFiltersProps = $state(
		persistedFilters
			? JSON.parse(persistedFilters)
			: {
					eventId: '333',
					stateId: 'RJ',
					competitionMode: 'single'
				}
	);
	const formattedLastUpdatedAt = $derived(toLocalFormat($updateStore.lastUpdatedAt));
	let rankingTableData: RankingTableData = $state({
		totalItems: 0,
		itemsPerPage: 10,
		currentPage: 1,
		paginatedData: []
	});

	function handlePageChange(newPage: number) {
		rankingTableData.currentPage = newPage;
	}

	// TODO: Melhorar tipagens
	function updateTableFilters(field: any, value: any) {
		const updatedTableFilters = { ...tableFilters, [field]: value };
		tableFilters = updatedTableFilters;
		localStorage.setItem(KEY_PERSISTED_RANKING_FILTERS, JSON.stringify(updatedTableFilters));
		handlePageChange(1);
	}

	// TODO: Implementar cache
	async function loadTableData() {
		await loadRanking({
			mode: tableFilters.competitionMode,
			eventId: tableFilters.eventId,
			stateId: tableFilters.stateId,
			page: rankingTableData.currentPage - 1,
			itensPerPage: rankingTableData.itemsPerPage
		});
	}

	$effect(() => {
		rankingTableData.paginatedData = $rankingStore.items;
	});

	$effect(() => {
		rankingTableData.totalItems = $rankingStore.totalItems;
	});

	$effect(() => {
		loadTableData();
	});

	onMount(async () => {
		await loadTableData();
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

<!-- Repensar existência do componente de filtro -->
<TableFilters filters={tableFilters} updateFiltersFn={updateTableFilters} />

{#if rankingTableData.totalItems > 0}
	<Table>
		<TableBase>
			<TableHead>
				<TableRow isHeader>
					<TableCell isHeader>Posição</TableCell>
					<TableCell isHeader>Nome</TableCell>
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
		</TableBase>

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
	</Table>
{:else}
	<EmptyMessage />
{/if}
