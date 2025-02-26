<script lang="ts">
	import Typography from "../Typography/Typography.svelte";
    import type { PageTitleProps } from "./types";

    let { text, align = 'left' }: PageTitleProps = $props();
</script>

<Typography type="h2" color="NEUTRAL_DARK_2" align={align}>{text}</Typography>