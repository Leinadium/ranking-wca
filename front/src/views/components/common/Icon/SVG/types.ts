import type { ColorTokens } from '$lib/tokens/types';
import type { SizeProp } from '@fortawesome/fontawesome-svg-core';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';

export interface SVGIconProps {
	name: keyof typeof solidIcons;
	color?: ColorTokens;
	size?: SizeProp;
}
