import { LOCALE } from "$lib/constants/location";
import { checkIsNullOrUndefinedOrEmptyStringOrNotNumber } from "./validation";

export function formatValueAsInt(value: number | string | null): number | null {
    if (checkIsNullOrUndefinedOrEmptyStringOrNotNumber(value)) return null
    if (typeof value === 'string') return parseInt(value)

    const formattedValue = new Intl
        .NumberFormat(LOCALE, { maximumFractionDigits: 0 })
        .format(value as number)
        
    return Number(formattedValue) ?? null
}

function formatCentisecondsAsMinutes(time: number): string {
    const minutes: number = Math.floor(time / 60);
    const formattedMinutes: string = minutes?.toString()?.padStart(2, '0')

    const seconds: number = Math.floor(time % 60);
    const formattedSeconds: string = seconds?.toString()?.padStart(2, '0')

    const milliseconds: number = Math.floor((time % 1) * 100);
    const formattedMilliseconds: string = milliseconds?.toString()?.padStart(2, '0') ?? '00'

    // centiseconds -> MM:SS.mm
    return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

// TODO: Implementar formatação
function formatMultiBlindResult(time: number): string {
    return ''
}

// TODO: Refatorar para evitar duplicação de código
export function formatTimeByEvent(time: number | null, eventType: string): string {
    if (time === -1) return 'DNF';
    if (time === -2) return 'DNS';
    if (time === 0) return '';
    if (time === null) return '??';

    switch (eventType) {
        case '333fm':
            return formatValueAsInt(time)?.toString() ?? '??';
        case '333bf':
            return formatMultiBlindResult(time);
        default:
            return formatCentisecondsAsMinutes(time / 100);
    }
}

// TODO: Refatorar para evitar duplicação de código
export function formatByGenericTimeRules(time: number | null): string {
    if (time === -1) return 'DNF';
    if (time === -2) return 'DNS';
    if (time === 0) return '';
    if (time === null) return '??';

    return formatCentisecondsAsMinutes(time / 100);
}