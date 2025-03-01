<script lang="ts">
	import Typography from '../../Typography/Typography.svelte';
	import type { InputGroupLabelProps } from './types';

	let { text }: InputGroupLabelProps = $props();
</script>

<Typography type="h6" color="NEUTRAL_DARK_2">{text}</Typography>
