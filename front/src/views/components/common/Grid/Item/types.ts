import type { Snippet } from "svelte";

type GridItemDirection = 'ROW' | 'COLUMN'

type GridItemJustifyContentOptions = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'end' | 'left' | 'right';

type GridItemAlignItemsOptions = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

type GridItemWrapOptions = 'NOWRAP' | 'WRAP' | 'WRAP-REVERSE' | 'CUSTOM-WRAP';

export interface GridItemProps {
    children: Snippet<[]>;
    classes?: string;
    margin?: number | string;
    gap?: number;
    direction?: GridItemDirection;
    justifyContent?: GridItemJustifyContentOptions;
    alignItems?: GridItemAlignItemsOptions;
    wrap?: GridItemWrapOptions;
};