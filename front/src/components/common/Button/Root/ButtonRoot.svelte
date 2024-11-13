<script lang="ts">
    import type { ButtonRootProps, ButtonRootConfigs, ButtonRootClassesConfigs } from "./types";

    let {
        type = 'OUTLINED',
        color,
        width = 'auto',
        children,
        onClickFn,
        disabled = false,
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
    class={`button ${TYPES_CONFIGS.type.class} ${TYPES_CONFIGS.color[color].class} ${width === 'full' ? 'button-full' : 'button-auto'}`}
    onclick={onClickFn}
    {disabled}
>
    {@render children?.({...props, color: TYPES_CONFIGS.color[color].mainColor})}
</button>

<style>
    @import './style.css';
</style>