export function timeToString(ts: number | string): string {
    if (typeof ts === "number") {
        if (ts === 0) {
            return "";
        } else if (ts === -1) {
            return "DNF";
        } else if (ts === -2) {
            return "DNS";
        } else {
            return ts.toFixed(2);
        }
    }
    return ts
}

export function stateIdToPng(st: string): string {
    return `/flags/${st.toLowerCase()}.png`
}