<script lang="ts">
	import type { IconDefinition, IconPack, IconPrefix, IconProp } from '@fortawesome/fontawesome-svg-core';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import * as solidIcons from '@fortawesome/free-solid-svg-icons';
	import type { SVGIconProps } from './types';

    function getIconByName(iconName: keyof typeof solidIcons): IconDefinition | IconPrefix | IconPack | undefined {
        return solidIcons[iconName];
    }

    let { name }: SVGIconProps = $props();
</script>

<FontAwesomeIcon class="svg-icon" icon={getIconByName(name) as IconProp} />