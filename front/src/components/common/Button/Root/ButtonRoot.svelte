<script lang="ts">
    import type { ButtonRootProps, ButtonRootConfigs, ButtonRootClassesConfigs } from "./types";
	import { DEFAULT_BUTTON_SIZE } from "$lib/constants/components/Button";
    import './style.css';

    let {
        type = 'OUTLINED',
        color,
        size = DEFAULT_BUTTON_SIZE,
        width = 'auto',
        children,
        onClickFn,
        disabled = false,
        active = false,
        classes,
        ...props
    }: ButtonRootProps = $props();

    const TYPE_CLASSES: ButtonRootClassesConfigs = {
        type: {
            BASIC: 'button-basic',
            OUTLINED: 'button-outlined',
        },
        color: {
            PRIMARY: 'button-primary',
            SECONDARY: 'button-secondary',
            NEUTRAL: 'button-neutral',
            POSITIVE: 'button-positive',
            WARNING: 'button-warning',
            NEGATIVE: 'button-negative',
        }
    };
    const TYPES_CONFIGS: ButtonRootConfigs = {
        type: {
            class: TYPE_CLASSES.type[type],
        },
        color: {
            PRIMARY: {
                mainColor: 'PRIMARY_BASE',
                class: TYPE_CLASSES.color[color],
            },
            SECONDARY: {
                mainColor: 'SECONDARY_BASE',
                class: TYPE_CLASSES.color[color],
            },
            NEUTRAL: {
                mainColor: 'NEUTRAL_DARK_1',
                class: TYPE_CLASSES.color[color],
            },
            POSITIVE: {
                mainColor: 'ACCENT_POSITIVE_BASE',
                class: TYPE_CLASSES.color[color],
            },
            WARNING: {
                mainColor: 'ACCENT_WARNING_BASE',
                class: TYPE_CLASSES.color[color],
            },
            NEGATIVE: {
                mainColor: 'ACCENT_NEGATIVE_BASE',
                class: TYPE_CLASSES.color[color],
            },
        }
    };
</script>

<button
    class={`button ${TYPES_CONFIGS.type.class} ${TYPES_CONFIGS.color[color].class} ${width === 'full' ? 'button-full' : 'button-auto'} ${active ? 'button-active' : ''} ${classes || ''}`}
    onclick={onClickFn}
    {disabled}
>
    {@render children?.({...props, color: TYPES_CONFIGS.color[color].mainColor})}
</button>