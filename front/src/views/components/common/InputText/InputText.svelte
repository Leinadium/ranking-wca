<script lang="ts">
	import type { InputTextProps } from './types';
	import '../input.css';

	let { value, placeholder, onChangeFn }: InputTextProps = $props();
</script>

<input
	class={'input input--text'}
	type="text"
	bind:value
	{placeholder}
	onkeyup={(event) => onChangeFn(event)}
	onpaste={(event) => onChangeFn(event)}
/>
