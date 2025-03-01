import type { CompetitionModes } from '$lib/types/competitions';
import type { RankingResultViewModel } from '../../../viewModels/ranking/types';
import type { TableSortDirectionOptions } from '../../components/common/Table/TableSortLabel/types';

export interface RankingTableData {
	totalItems: number;
	itemsPerPage: number;
	currentPage: number;
	paginatedData: RankingResultViewModel[] | [];
}

//TODO: Melhorar tipagens
export interface RankingTableFiltersProps {
	eventId: string;
	stateId: string;
	competitionMode: CompetitionModes;
}
