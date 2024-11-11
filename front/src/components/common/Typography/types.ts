import type { ColorTokens } from "$lib/tokens/types";

type TypographyTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'button' | 'bodyOne' | 'bodyTwo' | 'caption';

export interface TypographyProps {
    children: any; // TODO: Melhorar tipagem
    type: TypographyTypes;
    color: ColorTokens;
};

interface TypographyTypeConfigs {
    tag: string;
    family: string;
    size: string;
    lineHeight: string;
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