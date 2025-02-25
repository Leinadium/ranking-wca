<script lang="ts">
	import type { InputTextProps } from "./types";

    let { value, placeholder, onChangeFn }: InputTextProps = $props();
</script>

<input
    type="text" bind:value={value}
    placeholder={placeholder}
    onkeyup={(event) => onChangeFn(event)}
    onpaste={(event) => onChangeFn(event)}
/>