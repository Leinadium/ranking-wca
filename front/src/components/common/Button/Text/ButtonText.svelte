<script lang="ts">
	import Typography from "../../Typography/Typography.svelte";
	import type { ButtonTextProps } from "./types";

    let { children, color, ...props }: ButtonTextProps = $props();
</script>

<Typography {...props} type="button" color={color}>
	{@render children()}
</Typography>