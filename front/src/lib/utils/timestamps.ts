const locale = 'pt-br'

export function toLocalFormat(timestamp: Date | string | null, options?: Intl.DateTimeFormatOptions): string | undefined {
    if (!timestamp) return
    return new Date(timestamp).toLocaleString(locale, options)
}

export function toLocalDateFormat(timestamp: Date | string | null, options?: Intl.DateTimeFormatOptions): string | undefined {
    if (!timestamp) return
    return new Date(timestamp).toLocaleDateString(locale, options)
}

export function toLocalTimeFormat(timestamp: Date | string | null, options?: Intl.DateTimeFormatOptions): string | undefined {
    if (!timestamp) return
    return new Date(timestamp).toLocaleTimeString(locale, options)
}