import type { ColorTokens } from "$lib/tokens/types";
import type { Snippet } from "svelte";

type ButtonRootTypes = 'BASIC' | 'OUTLINED';

type ButtonRootTypeClasses = 'button-basic' | 'button-outlined';

type ButtonRootColors = 'PRIMARY' | 'SECONDARY' | 'NEUTRAL' | 'POSITIVE' | 'WARNING' | 'NEGATIVE';

type ButtonRootColorClasses = 'button-primary' | 'button-secondary' | 'button-neutral' | 'button-positive' | 'button-warning' | 'button-negative';

type ButtonRootWidthOptions = 'auto' | 'full';

export interface ButtonRootProps {
    type: ButtonRootTypes;
    color: ButtonRootColors;
    width?: ButtonRootWidthOptions;
    children?: any; // TODO: Melhorar tipagem
    onClickFn?: () => void;
    disabled?: boolean;
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
    }
};

export interface ButtonRootClassesConfigs {
    type: {
        BASIC: ButtonRootTypeClasses;
        OUTLINED: ButtonRootTypeClasses;
    };
    color: {
        PRIMARY: ButtonRootColorClasses;
        SECONDARY: ButtonRootColorClasses;
        NEUTRAL: ButtonRootColorClasses;
        POSITIVE: ButtonRootColorClasses;
        WARNING: ButtonRootColorClasses;
        NEGATIVE: ButtonRootColorClasses;
    }
}