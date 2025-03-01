import type { Snippet } from 'svelte';

export interface TableCellProps {
	children: Snippet<[]>;
	isHeader?: boolean;
	isFooter?: boolean;
	isHighlighted?: boolean;
	colspan?: number;
}
