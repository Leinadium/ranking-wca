import type { PersonCurrentRecordsViewModel } from "../../../../viewModels/person/types";
import type { TableSortDirectionOptions } from "../../../components/common/Table/TableSortLabel/types";

export interface CurrentRecordsTableData {
    totalItems: number,
    itemsPerPage: number,
    currentPage: number,
    sortDirection: TableSortDirectionOptions,
    sortColumn: keyof PersonCurrentRecordsViewModel, //TODO: Melhorar tipagem
    sortedData: PersonCurrentRecordsViewModel[]  | [],
    paginatedData: PersonCurrentRecordsViewModel[]  | [],
};