import type { TableSortDirectionOptions } from "../../components/common/Table/TableSortLabel/types";

export function compareStringsForSorting(firstValue: string, secondValue: string, sortDirection: TableSortDirectionOptions) {
    // Ordem crescente
    if (sortDirection === 'asc') return firstValue.localeCompare(secondValue);
    
    // Ordem decrescente
    return secondValue.localeCompare(firstValue);
};

export function compareNumbersForSorting(firstValue: number, secondValue: number, sortDirection: TableSortDirectionOptions) {
    // Ordem crescente
    if (sortDirection === 'asc') return firstValue - secondValue;
    
    // Ordem decrescente
    return secondValue - firstValue;
};

export function sortObjectList(data: { [key: string]: any }[], sortKey: string, sortDirection: TableSortDirectionOptions) {
    const sortedData = [...data].sort((a, b) => {
        const valueA = a[sortKey];
        const valueB = b[sortKey];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return compareStringsForSorting(valueA, valueB, sortDirection)
        }
        
        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return compareNumbersForSorting(valueA, valueB, sortDirection)
        }

        // Se os valores forem de tipos mistos ou não comparáveis considera todos iguais
        return 0;
    });

    return sortedData
};