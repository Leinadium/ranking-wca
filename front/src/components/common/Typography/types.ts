import type { ColorTokens } from "$lib/tokens/types";
import type { Snippet } from "svelte";

type TypographyTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'button' | 'bodyOne' | 'bodyTwo' | 'caption';

type TypographyWeightOptions = 'regular' | 'bold';

export interface TypographyProps {
    children: Snippet<[]>;
    type: TypographyTypes;
    color?: ColorTokens;
};

interface TypographyTypeConfigs {
    tag: string;
    family: string;
    size: string;
    lineHeight: string;
    weight: TypographyWeightOptions;
};

export interface TypographyTypesConfigs {
    h1: TypographyTypeConfigs;
    h2: TypographyTypeConfigs;
    h3: TypographyTypeConfigs;
    h4: TypographyTypeConfigs;
    h5: TypographyTypeConfigs;
    h6: TypographyTypeConfigs;
    button: TypographyTypeConfigs;
    bodyOne: TypographyTypeConfigs;
    bodyTwo: TypographyTypeConfigs;
    caption: TypographyTypeConfigs;
};