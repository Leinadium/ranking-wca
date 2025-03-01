export function checkIsNullOrUndefined(value: any): boolean {
	return (value === null || value === undefined) && value !== 0 && value !== false;
}

export function checkIsNullOrUndefinedOrEmptyString(value: any): boolean {
	const valuesAsFormattedString = value?.toString()?.trim();
	return checkIsNullOrUndefined(value) || valuesAsFormattedString === '';
}

export function checkIsNullOrUndefinedOrNotNumber(value: any): boolean {
	return checkIsNullOrUndefined(value) || Number.isNaN(value);
}

export function checkIsNullOrUndefinedOrEmptyStringOrNotNumber(value: any): boolean {
	return checkIsNullOrUndefinedOrNotNumber(value) || checkIsNullOrUndefinedOrEmptyString(value);
}

export function checkIsNullOrUndefinedOrEmptyArray(value: any): boolean {
	return checkIsNullOrUndefined(value) || (Array.isArray(value) && value?.length <= 0);
}
