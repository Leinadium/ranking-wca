import type { Snippet } from "svelte";

export interface TableRootProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}