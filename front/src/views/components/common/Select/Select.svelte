<script lang="ts">
	import type { SelectProps } from "./types";

    let { options, value, onChangeFn }: SelectProps = $props();
</script>

<select class="select" bind:value={value} onchange={(event) => onChangeFn(event)}>
    {#each options as option}
        <option value={option.value} >{option.label}</option>
    {/each}
</select>