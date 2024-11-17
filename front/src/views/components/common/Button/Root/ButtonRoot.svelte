<script lang="ts">
    import type { ButtonRootProps, ButtonRootConfigs, ButtonRootClassesConfigs, ButtonRootTagOptions, ButtonRootTag } from "./types";
	import { DEFAULT_BUTTON_SIZE } from "$lib/constants/components/Button";
    import './style.css';

    let {
        type = 'OUTLINED',
        color,
        size = DEFAULT_BUTTON_SIZE,
        width = 'auto',
        children,
        onClickFn,
        active = false,
        classes,
        href,
        ...props
    }: ButtonRootProps = $props();

    const TYPE_CLASSES: ButtonRootClassesConfigs = {
        type: {
            BASIC: 'button--basic',
            OUTLINED: 'button--outlined',
        },
        color: {
            PRIMARY: 'button--primary',
            SECONDARY: 'button--secondary',
            NEUTRAL: 'button--neutral',
            POSITIVE: 'button--positive',
            WARNING: 'button--warning',
            NEGATIVE: 'button--negative',
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
    const TAG_OPTIONS: ButtonRootTag = {
        BUTTON: 'button',
        LINK: 'a',
    }
    const buttonTag: ButtonRootTagOptions = href ? 'LINK' : 'BUTTON';
</script>

<!-- TODO: Resolver problema de acessibilidade apontado abaixo -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
    this={TAG_OPTIONS[buttonTag]}
    class={`button ${TYPES_CONFIGS.type.class} ${TYPES_CONFIGS.color[color].class} ${width === 'full' ? 'button--full' : 'button--auto'} ${active ? 'button-active' : ''} ${classes || ''}`}
    {...(onClickFn && { onclick: onClickFn })}
    {...(href && { href })}
    {...(href && { rel: "noopener noreferrer" })}
    {...props}
>
    {@render children?.({...props, color: TYPES_CONFIGS.color[color].mainColor})}
</svelte:element>