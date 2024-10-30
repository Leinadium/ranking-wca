export const timeToString = (ts: number) => {
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
}

export const stateIdToPng = (st: string) => {
    return `/flags/${st.toLowerCase()}.png`
}