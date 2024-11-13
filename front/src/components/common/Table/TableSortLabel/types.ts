import type { Snippet } from "svelte";

export interface TableRootProps {
    children: Snippet<[]>;
    sortDirection: 'asc' | 'desc';
    column: string;
    onSortChange: (newDirection: 'asc' | 'desc', column: string) => void;
}