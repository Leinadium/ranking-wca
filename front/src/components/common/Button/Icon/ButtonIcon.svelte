<script lang="ts">
	import FontIcon from "../../Icon/Font/FontIcon.svelte";
	import type { ButtonIconProps } from "./types";

    let props: ButtonIconProps = $props();
</script>

<FontIcon {...props}/>