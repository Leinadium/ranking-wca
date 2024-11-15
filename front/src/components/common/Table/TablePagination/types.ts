import type { ButtonRootColors, ButtonRootSizes, ButtonRootTypes } from "../../Button/Root/types";

export interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export interface TablePaginationStyleConfigs {
    TYPE: ButtonRootTypes;
    COLOR: ButtonRootColors;
    SIZE: ButtonRootSizes;
}