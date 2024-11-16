import type { ColorTokens } from "$lib/tokens/types";

type DividerSizeOptions = 'FULL' | 'HALF' | number

export interface DividerProps {
    isVertical?: boolean;
    size?: DividerSizeOptions;
    thickness?: number;
    color?: ColorTokens;
}