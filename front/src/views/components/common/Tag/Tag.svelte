<script lang="ts">
    import type { TagProps } from "./types";
    import './style.css'
	import Typography from "../Typography/Typography.svelte";

    let { text, color = 'NEUTRAL', align = 'center', isFullWidth = false }: TagProps = $props();

    const TYPE_CLASSES = {
        color: {
            PRIMARY: 'tag--primary',
            SECONDARY: 'tag--secondary',
            NEUTRAL: 'tag--neutral',
            POSITIVE: 'tag--positive',
            WARNING: 'tag--warning',
            NEGATIVE: 'tag--negative',
        }
    };
    const customStyle = $derived(`
        width: ${isFullWidth ? '100%' : 'auto'};
    `)
</script>

<div class={`tag ${TYPE_CLASSES.color[color]}`} style={customStyle}>
    <Typography type={'bodyOne'} color={`${color}_DARK_2`} align={align}>{text}</Typography>
</div>