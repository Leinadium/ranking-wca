export function paginate<T>(data: T[], currentPage: number, itemsPerPage: number) {
    const offset = (currentPage - 1) * itemsPerPage;
    return data.slice(offset, offset + itemsPerPage);
}