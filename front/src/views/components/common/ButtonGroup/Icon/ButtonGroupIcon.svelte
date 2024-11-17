<script lang="ts">
	import ButtonIcon from "../../Button/Icon/ButtonIcon.svelte";
	import type { ButtonIconProps } from "../../Button/Icon/types";

    let props: ButtonIconProps = $props();
</script>

<ButtonIcon {...props}/>