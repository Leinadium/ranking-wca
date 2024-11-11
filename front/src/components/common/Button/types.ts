import type { ColorTokens } from "$lib/tokens/types";

type ButtonTypes = 'BASIC' | 'OUTLINED';

type ButtonTypeClasses = 'button-basic' | 'button-outlined';

type ButtonColors = 'PRIMARY' | 'SECONDARY' | 'NEUTRAL' | 'POSITIVE' | 'WARNING' | 'NEGATIVE';

type ButtonColorClasses = 'button-primary' | 'button-secondary' | 'button-neutral' | 'button-positive' | 'button-warning' | 'button-negative';

type ButtonWidthOptions = 'auto' | 'full';

export interface ButtonProps {
    type: ButtonTypes;
    color: ButtonColors;
    width?: ButtonWidthOptions;
    icon?: any; //TODO: Criar componente de ícone
    text?: string;
    onClickFn?: () => void;
};

interface ButtonColorConfigs {
    mainColor: ColorTokens;
    class: ButtonColorClasses;
};

export interface ButtonConfigs {
    type: {
        class: ButtonTypeClasses,
    };
    color: {
        PRIMARY: ButtonColorConfigs;
        SECONDARY: ButtonColorConfigs;
        NEUTRAL: ButtonColorConfigs;
        POSITIVE: ButtonColorConfigs;
        WARNING: ButtonColorConfigs;
        NEGATIVE: ButtonColorConfigs;
    }
};

export interface ButtonClassesConfigs {
    type: {
        BASIC: ButtonTypeClasses;
        OUTLINED: ButtonTypeClasses;
    };
    color: {
        PRIMARY: ButtonColorClasses;
        SECONDARY: ButtonColorClasses;
        NEUTRAL: ButtonColorClasses;
        POSITIVE: ButtonColorClasses;
        WARNING: ButtonColorClasses;
        NEGATIVE: ButtonColorClasses;
    }
}