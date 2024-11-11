<script lang="ts">
	import Typography from "../Typography/Typography.svelte";
    import type { ButtonProps, ButtonConfigs, ButtonClassesConfigs } from "./types";

    //TODO: Criar componente de ícone
    let { type = 'OUTLINED', color, width = 'auto', icon, text, onClickFn }: ButtonProps = $props();

    const TYPE_CLASSES: ButtonClassesConfigs = {
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
    const TYPES_CONFIGS: ButtonConfigs = {
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
>
    {#if icon}
        <span>{icon}</span>
    {/if}

    {#if text}
        <Typography type="button" color={TYPES_CONFIGS.color[color].mainColor}>{text}</Typography>
    {/if}
</button>

<style>
    @import './style.css';
</style>