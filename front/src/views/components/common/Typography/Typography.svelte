<script lang="ts">
	import {
		COLOR_TOKENS,
		FONT_FAMILY_TOKENS,
		FONT_SIZE_TOKENS,
		LINE_HEIGHT_TOKENS
	} from '$lib/tokens';
	import type { TypographyTypesConfigs, TypographyProps } from './types';
	import './style.css';

	let { children, type, color, align = 'left', classes, ...props }: TypographyProps = $props();

	const TYPES_CONFIGS: TypographyTypesConfigs = {
		h1: {
			tag: 'h1',
			family: FONT_FAMILY_TOKENS.PRIMARY,
			size: FONT_SIZE_TOKENS.BIGGER_6,
			lineHeight: LINE_HEIGHT_TOKENS.BIG_FONT,
			weight: 'bold'
		},
		h2: {
			tag: 'h2',
			family: FONT_FAMILY_TOKENS.PRIMARY,
			size: FONT_SIZE_TOKENS.BIGGER_5,
			lineHeight: LINE_HEIGHT_TOKENS.BIG_FONT,
			weight: 'bold'
		},
		h3: {
			tag: 'h3',
			family: FONT_FAMILY_TOKENS.PRIMARY,
			size: FONT_SIZE_TOKENS.BIGGER_4,
			lineHeight: LINE_HEIGHT_TOKENS.BIG_FONT,
			weight: 'bold'
		},
		h4: {
			tag: 'h4',
			family: FONT_FAMILY_TOKENS.PRIMARY,
			size: FONT_SIZE_TOKENS.BIGGER_3,
			lineHeight: LINE_HEIGHT_TOKENS.BIG_FONT,
			weight: 'bold'
		},
		h5: {
			tag: 'h5',
			family: FONT_FAMILY_TOKENS.PRIMARY,
			size: FONT_SIZE_TOKENS.BIGGER_2,
			lineHeight: LINE_HEIGHT_TOKENS.BIG_FONT,
			weight: 'bold'
		},
		h6: {
			tag: 'h1',
			family: FONT_FAMILY_TOKENS.PRIMARY,
			size: FONT_SIZE_TOKENS.BIGGER_1,
			lineHeight: LINE_HEIGHT_TOKENS.BIG_FONT,
			weight: 'bold'
		},
		buttonDefault: {
			tag: 'span',
			family: FONT_FAMILY_TOKENS.SECONDARY,
			size: FONT_SIZE_TOKENS.BUTTON_DEFAULT,
			lineHeight: LINE_HEIGHT_TOKENS.SMALL_FONT,
			weight: 'regular'
		},
		buttonSmall: {
			tag: 'span',
			family: FONT_FAMILY_TOKENS.SECONDARY,
			size: FONT_SIZE_TOKENS.BUTTON_SMALL,
			lineHeight: LINE_HEIGHT_TOKENS.SMALL_FONT,
			weight: 'regular'
		},
		bodyOne: {
			tag: 'p',
			family: FONT_FAMILY_TOKENS.SECONDARY,
			size: FONT_SIZE_TOKENS.BASE,
			lineHeight: LINE_HEIGHT_TOKENS.MEDIUM_FONT,
			weight: 'regular'
		},
		bodyTwo: {
			tag: 'span',
			family: FONT_FAMILY_TOKENS.SECONDARY,
			size: FONT_SIZE_TOKENS.SMALLER_1,
			lineHeight: LINE_HEIGHT_TOKENS.SMALL_FONT,
			weight: 'regular'
		},
		caption: {
			tag: 'small',
			family: FONT_FAMILY_TOKENS.SECONDARY,
			size: FONT_SIZE_TOKENS.SMALLER_2,
			lineHeight: LINE_HEIGHT_TOKENS.SMALL_FONT,
			weight: 'regular'
		}
	};

	const customStyle: string = `
        font-family: ${TYPES_CONFIGS[type].family};
        font-weight: ${TYPES_CONFIGS[type].weight};
        font-size: ${TYPES_CONFIGS[type].size};
        line-height: ${TYPES_CONFIGS[type].lineHeight};
        color: ${color ? COLOR_TOKENS[color] : 'inherit'};
        text-align: ${align};
    `;
</script>

<svelte:element
	this={TYPES_CONFIGS[type].tag}
	class="typography {classes || ''}"
	style={customStyle}
	{...props}
>
	{@render children()}
</svelte:element>
