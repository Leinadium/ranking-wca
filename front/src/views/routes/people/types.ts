import type { PeopleSearchResultViewModel } from "../../../viewModels/person/types";

export interface PeopleSearchTableData {
    totalItems: number,
    itemsPerPage: number,
    currentPage: number,
    paginatedData: PeopleSearchResultViewModel[] | [],
};