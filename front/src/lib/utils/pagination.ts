export function filterDataByPage<T>(data: T[], page: number, itemsPerPage: number) {
	const offset = (page - 1) * itemsPerPage;
	return data.slice(offset, offset + itemsPerPage);
}
