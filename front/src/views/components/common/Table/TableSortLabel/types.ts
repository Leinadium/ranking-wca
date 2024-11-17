import type { Snippet } from "svelte";
import type { PersonCurrentRecordsViewModel } from "../../../../../viewModels/person/types";

export type TableSortDirectionOptions = 'asc' | 'desc';

export interface TableSortLabelProps {
    children: Snippet<[]>;
    sortDirection: TableSortDirectionOptions;
    column: any; //TODO: Melhorar tipagem
    onSortChange: (newDirection: TableSortDirectionOptions, column: keyof PersonCurrentRecordsViewModel) => void;
}