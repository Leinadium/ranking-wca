<script lang="ts">
	import Typography from "../Typography/Typography.svelte";
    import type { InputLabelProps } from "./types";

    let { text }: InputLabelProps = $props();
</script>

<Typography type="h6" color="NEUTRAL_DARK_2">{text}</Typography>