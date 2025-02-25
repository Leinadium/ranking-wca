<script lang="ts">
	import type { SelectProps } from "./types";
    import '../input.css';
    import './style.css';

    let { options, value, onChangeFn }: SelectProps = $props();
</script>

<select class={'input select'} bind:value={value} onchange={(event) => onChangeFn(event)}>
    {#each options as option}
        <option value={option.value} >{option.label}</option>
    {/each}
</select>