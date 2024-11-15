import type { Snippet } from "svelte";

export interface TableSortLabelProps {
    children: Snippet<[]>;
    sortDirection: 'asc' | 'desc';
    column: string;
    onSortChange: (newDirection: 'asc' | 'desc', column: string) => void;
}