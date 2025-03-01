<script lang="ts">
	import type { SelectProps } from './types';
	import '../input.css';
	import './style.css';

	let { options, value, isFullWidth = false, onChangeFn }: SelectProps = $props();
	let customStyle = $derived(`
        width: ${isFullWidth ? '100%' : 'auto'}
    `);
</script>

<select
	bind:value
	class={'input select'}
	style={customStyle}
	onchange={(event) => onChangeFn(event)}
>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
