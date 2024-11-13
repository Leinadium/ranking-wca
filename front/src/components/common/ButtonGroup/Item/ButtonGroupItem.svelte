<script lang="ts">
	import Button from "../../Button/Button.svelte";
import type { ButtonProps } from "../../Button/types";

    let props: ButtonProps = $props();
</script>

<Button {...props} />