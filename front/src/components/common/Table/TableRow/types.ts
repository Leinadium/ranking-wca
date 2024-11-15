import type { Snippet } from "svelte";

export interface TableRowProps {
    children: Snippet<[]>;
    isHeader?: boolean;
    isFooter?: boolean;
    isHighlighted?: boolean;
}