import type { ButtonRootColors, ButtonRootSizes, ButtonRootTypes } from '../../Button/Root/types';

export interface TablePaginationProps {
	currentPage: number;
	totalItems: number;
	itemsPerPage?: number;
	maxVisiblePages?: number;
	onPageChange: (newPage: number) => void;
}

export interface TablePaginationStyleConfigs {
	TYPE: ButtonRootTypes;
	COLOR: ButtonRootColors;
	SIZE: ButtonRootSizes;
}
