import type { Snippet } from "svelte";

export interface TableRootProps {
    children: Snippet<[]>;
    isHeader?: boolean;
}