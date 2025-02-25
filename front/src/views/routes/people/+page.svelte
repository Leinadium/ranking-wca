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
	import Flag from "../../components/common/Flag/Flag.svelte";
	import { INTERNAL_ROUTES } from "$lib/constants/routes";
	import ButtonRoot from "../../components/common/Button/Root/ButtonRoot.svelte";
	import ButtonText from "../../components/common/Button/Text/ButtonText.svelte";
	import { updateStore } from "../../../stores/update";
	import { toLocalFormat } from "$lib/utils/timestamps";
	import { STATE_NAMES } from "$lib/constants/location";
	import { BRAND_NAME } from "$lib/constants/general";
	import {onMount} from "svelte";
	import InputGroupRoot from "../../components/common/InputGroup/Root/InputGroupRoot.svelte";
	import InputGroupLabel from "../../components/common/InputGroup/Label/InputGroupLabel.svelte";
	import InputText from "../../components/common/InputText/InputText.svelte";
	import { loadPeopleSearchResults } from "../../../viewModels/person";
	import { personStore } from "../../../stores/person";
	import type { PeopleSearchTableData } from "./types";
	import { KEY_PERSISTED_PEOPLE_SEARCH_TERM } from "$lib/constants/person";
	import { checkIsNullOrUndefinedOrEmptyString } from "$lib/utils/validation";
	import SvgIcon from "../../components/common/Icon/SVG/SVGIcon.svelte";
	import EmptyMessage from "../../components/common/EmptyMessage/EmptyMessage.svelte";
	
	let peopleSearchTerm = $state(sessionStorage.getItem(KEY_PERSISTED_PEOPLE_SEARCH_TERM) || '')
	const formattedLastUpdatedAt = $derived(toLocalFormat($updateStore.lastUpdatedAt));
	let peopleSearchTableData: PeopleSearchTableData = $state({
		totalItems: 0,
		itemsPerPage: 10,
		currentPage: 1,
		paginatedData: [],
	});

	function handlePageChange(newPage: number) {
		peopleSearchTableData.currentPage = newPage;
	};
	
	// TODO: Melhorar tipagens
	function handleSearchedPersonChange(event: any) {
		const searchTerm = event.target.value

		peopleSearchTerm = searchTerm
		sessionStorage.setItem(KEY_PERSISTED_PEOPLE_SEARCH_TERM, searchTerm)
		handlePageChange(1)
  	}

	// TODO: Implementar cache
	async function loadTableData() {
		if (checkIsNullOrUndefinedOrEmptyString(peopleSearchTerm) || peopleSearchTerm?.length < 3) {
			return peopleSearchTableData.totalItems = 0
		}

		await loadPeopleSearchResults({
			term: peopleSearchTerm,
		})
	}

	$effect(() => {
        peopleSearchTableData.paginatedData = $personStore.search.items
	})

	// TODO: Implementar totalItems quando busca estiver paginada pelo Back-end
	$effect(() => {
        peopleSearchTableData.totalItems = $personStore.search.items.length
        // peopleSearchTableData.totalItems = $rankingStore.search.totalItems
	})

	$effect(() => {
        loadTableData()
	})

	onMount(async () => {
		await loadTableData()
	});
</script>

<svelte:head>
	<title>Pessoas | {BRAND_NAME}</title>
</svelte:head>

<GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={1}>
	<PageTitle text={'Pessoas'} />
	<Typography type={'caption'} color={'NEUTRAL_DARK_1'}>
		Última atualização: {formattedLastUpdatedAt}
	</Typography>
</GridItem>

<InputGroupRoot>
	<InputGroupLabel text={'Nome'} />
	<InputText
		value={peopleSearchTerm}
		onChangeFn={handleSearchedPersonChange}
		placeholder={'Digite para buscar'}
	/>
</InputGroupRoot>

{#if peopleSearchTableData.totalItems > 0}
	<TableContainer>
		<TableBase>
			<TableHead>
				<TableRow isHeader>
					<TableCell isHeader>Nome</TableCell>
					<TableCell isHeader>ID da WCA</TableCell>
					<TableCell isHeader>Representando</TableCell>
				</TableRow>
			</TableHead>

			<TableBody>
				{#each peopleSearchTableData.paginatedData as row}
					<TableRow>
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
						<TableCell>
							<GridItem justifyContent={'flex-start'} gap={1}>
								{#if row?.stateId}
									<Flag stateId={row?.stateId} size={2} />
									{STATE_NAMES?.[row?.stateId]}
								{/if}
							</GridItem>
						</TableCell>
					</TableRow>
				{/each}
			</TableBody>

			<TableFooter>
				<TableRow isFooter>
					<TableCell isFooter colspan={3}>
						{#key `${peopleSearchTableData.currentPage}-${peopleSearchTableData.totalItems}-${peopleSearchTableData.itemsPerPage}`}
							<TablePagination
								currentPage={peopleSearchTableData.currentPage}
								totalItems={peopleSearchTableData.totalItems}
								itemsPerPage={peopleSearchTableData.itemsPerPage}
								onPageChange={handlePageChange}
							/>
						{/key}
					</TableCell>
				</TableRow>
			</TableFooter>
		</TableBase>
	</TableContainer>
{:else}
	<EmptyMessage iconName='faSearch'>
		Não foram encontrados resultados.<br />Por favor, refaça sua busca.
	</EmptyMessage>
{/if}