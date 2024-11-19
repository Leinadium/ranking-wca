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

function formatSecondsAsMinutes(time: number | null): string {
    if (!time) return ''

    const minutes: number = Math.floor(time / 60);
    const formattedMinutes: string = !minutes ? '' : `${minutes?.toString()?.padStart(2, '0')}:`

    const seconds: number = Math.floor(time % 60);
    const formattedSeconds: string = `${seconds?.toString()?.padStart(2, '0')}.`

    const milliseconds: number = Math.floor((time % 1) * 100);
    const formattedMilliseconds: string = milliseconds?.toString()?.padStart(2, '0') ?? '00'

    // Seconds -> MM:SS.mm
    return `${formattedMinutes}${formattedSeconds}${formattedMilliseconds}`;
}

function formatMultiBlindResult(time: number | null): string {
    if (time === null) return '';
    
    let solved: number;
    let attempted: number;
    let timeInSeconds: number | null;

    if (time.toString().length === 10) {
        // Old rule
        solved = 99 - Number(time.toString().slice(1, 3));
        attempted = Number(time.toString().slice(3, 5));
        timeInSeconds = Number(time.toString().slice(5));
    } else {
        // New rule
        const difference: number = 99 - Number(time.toString().slice(0, 2));
        const missed: number = Number(time.toString().slice(7));
    
        solved = difference + missed;
        attempted = solved + missed;
        timeInSeconds = Number(time.toString().slice(2, 7));
    }

    // 99999 = unknown
    timeInSeconds = timeInSeconds === 99999 ? null : timeInSeconds;

    return `${solved}/${attempted} ${formatSecondsAsMinutes(timeInSeconds)}`;
}

export function formatTimeByEvent(time: number | null, eventType: string): string {
    if (time === -1) return 'DNF';
    if (time === -2) return 'DNS';
    if (time === 0) return '';

    switch (eventType) {
        case '333fm':
            if (time === null) return '??';
            return formatValueAsInt(time)?.toString() ?? '??';
        case '333mbf':
            return formatMultiBlindResult(time);
        default:
            if (time === null) return '??';
            return formatSecondsAsMinutes(time/100);
    }
}