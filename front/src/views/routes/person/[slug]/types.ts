import type { CompetitionModes } from "$lib/types/competitions";
import type { PersonCurrentRecordsViewModel, PersonEventResultViewModel } from "../../../../viewModels/person/types";
import type { TableSortDirectionOptions } from "../../../components/common/Table/TableSortLabel/types";

//TODO: Melhorar tipagem diminuindo a repetição de código
export interface CurrentRecordsTableData {
    totalItems: number,
    itemsPerPage: number,
    currentPage: number,
    sortDirection: TableSortDirectionOptions,
    sortColumn: keyof PersonCurrentRecordsViewModel,
    sortedData: PersonCurrentRecordsViewModel[]  | [],
    paginatedData: PersonCurrentRecordsViewModel[]  | [],
};

export interface RankingByModeTableData {
    totalItems: number,
    itemsPerPage: number,
    currentPage: number,
    sortDirection: TableSortDirectionOptions,
    sortColumn: keyof PersonEventResultViewModel,
    sortedData: PersonEventResultViewModel[]  | [],
    paginatedData: PersonEventResultViewModel[]  | [],
};

export interface RankingByModeTableFiltersProps {
    // eventId: string;
    // stateId: string;
    competitionMode: CompetitionModes;
}