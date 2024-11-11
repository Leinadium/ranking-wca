<script lang="ts">
	import { COLOR_TOKENS, FONT_FAMILY_TOKENS, FONT_SIZE_TOKENS, LINE_HEIGHT_TOKENS } from '$lib/tokens';
	import type { TypographyTypesConfigs, TypographyProps } from './types';

    let { children, type, color }: TypographyProps = $props();

    const TYPES_CONFIGS: TypographyTypesConfigs = {
        h1: {
            tag: 'h1',
            family: FONT_FAMILY_TOKENS.PRIMARY,
            size: FONT_SIZE_TOKENS.BIGGER_6,
            lineHeight: LINE_HEIGHT_TOKENS.BIG_FONT,
        },
        h2: {
            tag: 'h2',
            family: FONT_FAMILY_TOKENS.PRIMARY,
            size: FONT_SIZE_TOKENS.BIGGER_5,
            lineHeight: LINE_HEIGHT_TOKENS.BIG_FONT,
        },
        h3: {
            tag: 'h3',
            family: FONT_FAMILY_TOKENS.PRIMARY,
            size: FONT_SIZE_TOKENS.BIGGER_4,
            lineHeight: LINE_HEIGHT_TOKENS.BIG_FONT,
        },
        h4: {
            tag: 'h4',
            family: FONT_FAMILY_TOKENS.PRIMARY,
            size: FONT_SIZE_TOKENS.BIGGER_3,
            lineHeight: LINE_HEIGHT_TOKENS.BIG_FONT,
        },
        h5: {
            tag: 'h5',
            family: FONT_FAMILY_TOKENS.PRIMARY,
            size: FONT_SIZE_TOKENS.BIGGER_2,
            lineHeight: LINE_HEIGHT_TOKENS.BIG_FONT,
        },
        h6: {
            tag: 'h1',
            family: FONT_FAMILY_TOKENS.PRIMARY,
            size: FONT_SIZE_TOKENS.BIGGER_1,
            lineHeight: LINE_HEIGHT_TOKENS.BIG_FONT,
        },
        bodyOne: {
            tag: 'p',
            family: FONT_FAMILY_TOKENS.SECONDARY,
            size: FONT_SIZE_TOKENS.BASE,
            lineHeight: LINE_HEIGHT_TOKENS.MEDIUM_FONT,
        },
        bodyTwo: {
            tag: 'span',
            family: FONT_FAMILY_TOKENS.SECONDARY,
            size: FONT_SIZE_TOKENS.SMALLER_1,
            lineHeight: LINE_HEIGHT_TOKENS.SMALL_FONT,
        },
        caption: {
            tag: 'small',
            family: FONT_FAMILY_TOKENS.SECONDARY,
            size: FONT_SIZE_TOKENS.SMALLER_2,
            lineHeight: LINE_HEIGHT_TOKENS.SMALL_FONT,
        },
    }
    
    const customStyle:string = `
        font-family: ${TYPES_CONFIGS[type].family};
        font-size: ${TYPES_CONFIGS[type].size};
        line-height: ${TYPES_CONFIGS[type].lineHeight};
        color: ${COLOR_TOKENS[color]};
    `
</script>

<svelte:element this={TYPES_CONFIGS[type].tag} class="typography" style={customStyle}>
    {@render children()}
</svelte:element>

<style>
    @import './style.css';
</style>