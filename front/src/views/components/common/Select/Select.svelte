<script lang="ts">
	import type { SelectProps } from "./types";

    let { options }: SelectProps = $props();
</script>

<select class="select">
    {#each options as option}
        <option value={option.value} >{option.label}</option>
    {/each}
</select>