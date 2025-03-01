import type { ColorTokens } from "$lib/tokens/types";

export type ButtonRootTypes = 'BASIC' | 'OUTLINED' | 'FILLED';

type ButtonRootTypeClasses = 'button--basic' | 'button--outlined' | 'button--filled';

export type ButtonRootColors = 'PRIMARY' | 'SECONDARY' | 'NEUTRAL' | 'POSITIVE' | 'WARNING' | 'NEGATIVE';

type ButtonRootColorClasses = 'button--primary' | 'button--secondary' | 'button--neutral' | 'button--positive' | 'button--warning' | 'button--negative';

export type ButtonRootSizes = 'SMALL' | 'DEFAULT';

type ButtonRootWidthOptions = 'auto' | 'full';

export type ButtonRootTagOptions = 'BUTTON' | 'LINK';

export type ButtonRootTargetOptions = '_blank' | '_self' | '_parent' | '_top';

export interface ButtonRootProps {
    type: ButtonRootTypes;
    color: ButtonRootColors;
    size?: ButtonRootSizes;
    width?: ButtonRootWidthOptions;
    children?: any; // TODO: Melhorar tipagem
    onClickFn?: () => void;
    disabled?: boolean;
    active?: boolean;
    classes?: string;
    href?: string;
    target?: ButtonRootTargetOptions;
    popovertarget?: string;
};

interface ButtonRootColorConfigs {
    mainColor: ColorTokens;
    class: ButtonRootColorClasses;
};

export interface ButtonRootConfigs {
    type: {
        class: ButtonRootTypeClasses,
    };
    color: {
        PRIMARY: ButtonRootColorConfigs;
        SECONDARY: ButtonRootColorConfigs;
        NEUTRAL: ButtonRootColorConfigs;
        POSITIVE: ButtonRootColorConfigs;
        WARNING: ButtonRootColorConfigs;
        NEGATIVE: ButtonRootColorConfigs;
    };
};

export interface ButtonRootClassesConfigs {
    type: {
        BASIC: ButtonRootTypeClasses;
        OUTLINED: ButtonRootTypeClasses;
        FILLED: ButtonRootTypeClasses;
    };
    color: {
        PRIMARY: ButtonRootColorClasses;
        SECONDARY: ButtonRootColorClasses;
        NEUTRAL: ButtonRootColorClasses;
        POSITIVE: ButtonRootColorClasses;
        WARNING: ButtonRootColorClasses;
        NEGATIVE: ButtonRootColorClasses;
    };
}

export type ButtonRootTag = {
    [key in ButtonRootTagOptions]: string;
};