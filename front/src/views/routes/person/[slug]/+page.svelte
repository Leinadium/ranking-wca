<script lang="ts">
	import GridItem from "../../../components/common/Grid/Item/GridItem.svelte";
	import PageTitle from "../../../components/common/PageTitle/PageTitle.svelte";
    import TableContainer from "../../../components/common/Table/TableContainer/TableContainer.svelte";
	import TableBase from "../../../components/common/Table/TableBase/TableBase.svelte";
	import TableHead from "../../../components/common/Table/TableHead/TableHead.svelte";
	import TableRow from "../../../components/common/Table/TableRow/TableRow.svelte";
	import TableCell from "../../../components/common/Table/TableCell/TableCell.svelte";
	import TableSortLabel from "../../../components/common/Table/TableSortLabel/TableSortLabel.svelte";
	import TableBody from "../../../components/common/Table/TableBody/TableBody.svelte";
    import { page } from '$app/stores';
	import { onMount } from "svelte";
	import { loadPersonCurrentRecords, loadPersonImage, loadPersonInfo, loadPersonRankingByModeRecords } from "../../../../viewModels/person";
	import Flag from "../../../components/common/Flag/Flag.svelte";
	import Typography from "../../../components/common/Typography/Typography.svelte";
	import { STATE_NAMES } from "$lib/consts";
	import type { PersonCurrentRecordsViewModel, PersonEventResultViewModel } from "../../../../viewModels/person/types";
	import { toLocalFormat } from "$lib/utils/timestamps";
	import { updateStore } from "../../../../stores/update";
	import { sortObjectList } from "$lib/utils/sort";
	import { filterDataByPage } from "$lib/utils/pagination";
	import type { CurrentRecordsTableData, RankingByModeTableData } from "./types";
	import { EVENT_LIST } from "$lib/constants/events";
	import { personStore } from "../../../../stores/person";
	import ButtonRoot from "../../../components/common/Button/Root/ButtonRoot.svelte";
	import ButtonText from "../../../components/common/Button/Text/ButtonText.svelte";
	import ButtonIcon from "../../../components/common/Button/Icon/ButtonIcon.svelte";
	import FontIcon from "../../../components/common/Icon/Font/FontIcon.svelte";
	import { formatByGenericTimeRules, formatTimeByEvent, formatValueAsInt } from "$lib/utils/numbers";
	import type { CompetitionModes } from "$lib/types/competitions";
	import type { TableSortDirectionOptions } from "../../../components/common/Table/TableSortLabel/types";
	import TableFilters from "../../../components/common/TableFilters/TableFilters.svelte";
    import './style.css'
    
    const personId = $page.params.slug

    // TODO: Implementar filtros
    export const tableFilters = $state({
		// eventId: '333',
		// stateId: null,
		competitionMode: 'single',
	});

    const formattedLastUpdatedAt = $derived(toLocalFormat($updateStore.lastUpdatedAt));
    let currentRecordsTableData: CurrentRecordsTableData = $state({
		totalItems: 0,
		itemsPerPage: 0,
		currentPage: 1,
		sortDirection: 'asc',
		sortColumn: 'eventId',
		sortedData: [],
		paginatedData: [],
	});
    let rankingByModeTableData: RankingByModeTableData = $state({
		totalItems: 0,
		itemsPerPage: 0,
		currentPage: 1,
		sortDirection: 'asc',
		sortColumn: 'eventId',
		sortedData: [],
		paginatedData: [],
	});

	function handleSortChange(newDirection: TableSortDirectionOptions, column: keyof PersonEventResultViewModel | string) {
        rankingByModeTableData.sortDirection = newDirection;
        rankingByModeTableData.sortColumn = column as keyof PersonEventResultViewModel;
	};

  	$effect(() => {
        currentRecordsTableData.sortedData = sortObjectList<PersonCurrentRecordsViewModel>(
            $personStore.currentRecords,
            currentRecordsTableData.sortColumn,
            currentRecordsTableData.sortDirection,
        )
	})

  	$effect(() => {
        rankingByModeTableData.sortedData = sortObjectList<PersonEventResultViewModel>(
            $personStore.rankings?.[tableFilters.competitionMode],
            rankingByModeTableData.sortColumn,
            rankingByModeTableData.sortDirection,
        )
	})

	$effect(() => {
        currentRecordsTableData.paginatedData = filterDataByPage(
            currentRecordsTableData.sortedData,
            currentRecordsTableData.currentPage,
            currentRecordsTableData.itemsPerPage
        )
	})

	$effect(() => {
        rankingByModeTableData.paginatedData = filterDataByPage(
            rankingByModeTableData.sortedData,
            rankingByModeTableData.currentPage,
            rankingByModeTableData.itemsPerPage
        )
	})

	$effect(() => {
        currentRecordsTableData.itemsPerPage = $personStore.currentRecords.length
	})

    $effect(() => {
        rankingByModeTableData.itemsPerPage = $personStore.rankings?.[tableFilters.competitionMode]?.length
	})

	$effect(() => {
        currentRecordsTableData.totalItems = $personStore.currentRecords.length
	})

	$effect(() => {
        rankingByModeTableData.totalItems = $personStore.rankings?.[tableFilters.competitionMode]?.length
	})

    onMount(async () => {
        await Promise.all([
            loadPersonInfo({ wcaId: personId }),
            loadPersonImage({ wcaId: personId }),
            loadPersonCurrentRecords({ wcaId: personId }),
            loadPersonRankingByModeRecords({ wcaId: personId, mode: tableFilters.competitionMode }),
        ])
	});
</script>

<svelte:head>
	<title>{$personStore.name} | Cubos Estaduais</title>
</svelte:head>

<GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={1}>
    <!-- TODO: Criar componente Breadcrumb -->

    <Typography type={'caption'} color={'NEUTRAL_DARK_1'}>
        Última atualização: {formattedLastUpdatedAt}
    </Typography>
</GridItem>

<GridItem direction={'COLUMN'} gap={4}>
    <GridItem direction={'COLUMN'} alignItems={'center'} gap={1}>
        <PageTitle text={$personStore.name || '?'} />
    
        {#if $personStore.stateId}
            <GridItem justifyContent={'flex-start'} gap={1}>
                <Flag stateId={$personStore.stateId} size={2} />
                <Typography type={'bodyOne'} color={'NEUTRAL_DARK_1'}>{STATE_NAMES[$personStore.stateId]}</Typography>
            </GridItem>
        {/if}
    </GridItem>
    
    <!-- TODO: Criar componente Card -->
    <GridItem justifyContent={'center'} alignItems={'center'} gap={4}>
        <div class="portrait">
            <img class="portrait__image" src={$personStore.imageUrl} alt="Imagem do {$personStore.name}">
        </div>
    
        <!-- TODO: Refatorar para não repetir tanto código -->
        <!-- TODO: Criar componente Badge -->
        <GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={3}>
            <GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={1}>
                <Typography type={'h6'} color={'NEUTRAL_DARK_1'}>ID da WCA:</Typography>
                <Typography type={'bodyOne'} color={'NEUTRAL_DARK_1'}>{personId}</Typography>
            </GridItem>
    
            <GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={1}>
                <Typography type={'h6'} color={'NEUTRAL_DARK_1'}>Registrado:</Typography>
                <Typography type={'bodyOne'} color={'NEUTRAL_DARK_1'}>{$personStore.isRegistered}</Typography>
            </GridItem>
    
            <GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={1}>
                <Typography type={'h6'} color={'NEUTRAL_DARK_1'}>Competições totais:</Typography>
                <Typography type={'bodyOne'} color={'NEUTRAL_DARK_1'}>{$personStore.totalCompetitionsCount}</Typography>
            </GridItem>
    
            <GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={1}>
                <Typography type={'h6'} color={'NEUTRAL_DARK_1'}>Competições estaduais:</Typography>
                <Typography type={'bodyOne'} color={'NEUTRAL_DARK_1'}>{$personStore.stateCompetitionsCount}</Typography>
            </GridItem>
        </GridItem>
    </GridItem>
</GridItem>

<GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={1}>
    <Typography type={'h4'} color={'NEUTRAL_DARK_2'}>Recordes pessoais atuais</Typography>

    <TableContainer>
        <TableBase>
            <TableHead>
                <TableRow isHeader>
                    <TableCell isHeader>Evento</TableCell>
                    <TableCell isHeader>Tempo único</TableCell>
                    <TableCell isHeader>Média</TableCell>
                    <TableCell isHeader>Ranking tempo único</TableCell>
                    <TableCell isHeader>Ranking média</TableCell>
                </TableRow>
            </TableHead>
    
            <TableBody>
                {#each currentRecordsTableData.paginatedData as row}
                    {#if row.eventId}
                        <TableRow>
                            <TableCell>
                                <ButtonRoot type={'BASIC'} color={'NEUTRAL'}>
                                    <ButtonIcon>
                                        <FontIcon name={EVENT_LIST?.[row.eventId]?.icon || ''} />
                                    </ButtonIcon>

                                    <ButtonText>
                                        {EVENT_LIST[row.eventId].name}
                                    </ButtonText>
                                </ButtonRoot>
                            </TableCell>
                            <TableCell>{formatTimeByEvent(row.single, row.eventId)}</TableCell>
                            <TableCell>{formatTimeByEvent(row.average, row.eventId)}</TableCell>
                            <TableCell>{formatValueAsInt(row.rankingSingle)}</TableCell>
                            <TableCell>{formatValueAsInt(row.rankingAverage)}</TableCell>
                        </TableRow>
                    {/if}
                {/each}
            </TableBody>
        </TableBase>
    </TableContainer>
</GridItem>

<GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={1}>
    <Typography type={'h4'} color={'NEUTRAL_DARK_2'}>Resultados</Typography>

    <!-- TODO: Habilitar quando implementar filtros -->
    <!-- <TableFilters /> -->

    <TableContainer>
        <TableBase>
            <!-- TODO: Habilitar quando implementar filtros -->
            <!-- <TableHead>
                <TableRow isHeader>
                    <TableCell isHeader colspan={8}>
                        <ButtonRoot type={'BASIC'} color={'PRIMARY'}>
                            <ButtonIcon>
                                <FontIcon name={EVENT_LIST?.[tableFilters.eventId]?.icon || ''} />
                            </ButtonIcon>

                            <ButtonText>
                                {EVENT_LIST[tableFilters.eventId].name}
                            </ButtonText>
                        </ButtonRoot>
                    </TableCell>
                </TableRow>
            </TableHead> -->

            <TableHead>
                <TableRow isHeader>
                    <TableCell isHeader>
                        <TableSortLabel
                            sortDirection={rankingByModeTableData.sortDirection}
                            column={rankingByModeTableData.sortColumn}
                            onSortChange={handleSortChange}
                        >
                            Posição
                        </TableSortLabel>
                    </TableCell>
                    <TableCell isHeader>Competição</TableCell>
                    <TableCell isHeader>Posição</TableCell>
                    <TableCell isHeader>Tempo único</TableCell>
                    <TableCell isHeader colspan={5}>Resoluções</TableCell>
                </TableRow>
            </TableHead>
    
            <TableBody>
                {#each rankingByModeTableData.paginatedData as row}
                    <!-- TODO: Habilitar quando implementar filtros -->
                    <!-- {#if row.eventId === tableFilters.eventId} -->
                        <TableRow>
                            <TableCell>
                                <ButtonRoot type={'BASIC'} color={'NEUTRAL'}>
                                    <ButtonIcon>
                                        <FontIcon name={EVENT_LIST?.[row.eventId]?.icon || ''} />
                                    </ButtonIcon>
        
                                    <ButtonText>
                                        {EVENT_LIST[row.eventId].name}
                                    </ButtonText>
                                </ButtonRoot>
                            </TableCell>
                            <TableCell>
                                <ButtonRoot type={'BASIC'} color={'NEUTRAL'}>
                                    <Flag stateId={row.competitionState} size={2} />
                                    <ButtonText>{row.competitionName}</ButtonText>
                                </ButtonRoot>
                            </TableCell>
                            <TableCell>{row.ranking}</TableCell>
                            <TableCell>{formatTimeByEvent(row.best, row.eventId)}</TableCell>
                            {#each row.times as resolution}
                                <TableCell>{formatTimeByEvent(resolution, row.eventId)}</TableCell>
                            {/each}
                        </TableRow>
                    <!-- {/if } -->
                {/each}
            </TableBody>
        </TableBase>
    </TableContainer>
</GridItem>