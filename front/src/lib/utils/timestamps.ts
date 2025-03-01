import { LOCALE } from '$lib/constants/location';

export function toLocalFormat(
	timestamp: Date | string | null,
	options?: Intl.DateTimeFormatOptions
): string | undefined {
	if (!timestamp) return;
	return new Date(timestamp).toLocaleString(LOCALE, options);
}

export function toLocalDateFormat(
	timestamp: Date | string | null,
	options?: Intl.DateTimeFormatOptions
): string | undefined {
	if (!timestamp) return;
	return new Date(timestamp).toLocaleDateString(LOCALE, options);
}

export function toLocalTimeFormat(
	timestamp: Date | string | null,
	options?: Intl.DateTimeFormatOptions
): string | undefined {
	if (!timestamp) return;
	return new Date(timestamp).toLocaleTimeString(LOCALE, options);
}
