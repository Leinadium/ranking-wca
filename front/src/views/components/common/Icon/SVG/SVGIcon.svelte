<script lang="ts">
	import type { IconDefinition, IconPack, IconPrefix, IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import * as solidIcons from '@fortawesome/free-solid-svg-icons';
	import type { SVGIconProps } from './types';
	import { COLOR_TOKENS } from '$lib/tokens';

    function getIconByName(iconName: keyof typeof solidIcons): IconDefinition | IconPrefix | IconPack | undefined {
        return solidIcons[iconName];
    }

    let { name, color, size = '1x' }: SVGIconProps = $props();
</script>

<FontAwesomeIcon
    class="svg-icon"
    icon={getIconByName(name) as IconProp}
    style={`color: ${color ? COLOR_TOKENS[color] : 'inherit'}`}
    {size}
/>