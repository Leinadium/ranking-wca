import type { PersonCurrentRecordsViewModel, PersonImageViewModel, PersonInfoViewModel } from "../../viewModels/person/types";
import type { TableSortDirectionOptions } from "../../views/components/common/Table/TableSortLabel/types";

export interface PersonCurrentRecords {
    data: PersonCurrentRecordsViewModel[] | [],
    totalItems: number,
    itemsPerPage: number,
    currentPage: number,
    sortDirection: TableSortDirectionOptions,
    sortColumn: keyof PersonCurrentRecordsViewModel, //TODO: Melhorar tipagem
    sortedData: PersonCurrentRecordsViewModel[]  | [],
    paginatedData: PersonCurrentRecordsViewModel[]  | [],
};

export interface PersonStore extends PersonInfoViewModel, PersonImageViewModel {
    imageUrl: string | null;
    currentRecords: PersonCurrentRecords; 
    isLoading: boolean;
}