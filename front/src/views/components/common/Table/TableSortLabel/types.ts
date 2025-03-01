import type { Snippet } from 'svelte';
import type { PersonCurrentRecordsViewModel } from '../../../../../viewModels/person/types';

export type TableSortDirectionOptions = 'asc' | 'desc';

export interface TableSortLabelProps {
	children: Snippet<[]>;
	sortDirection: TableSortDirectionOptions;
	column: string;
	onSortChange: (newDirection: TableSortDirectionOptions, column: string) => void;
}
