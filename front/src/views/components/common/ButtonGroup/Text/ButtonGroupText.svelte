<script lang="ts">
	import ButtonText from '../../Button/Text/ButtonText.svelte';
	import type { ButtonTextProps } from '../../Button/Text/types';

	let { children, ...props }: ButtonTextProps = $props();
</script>

<ButtonText {...props}>
	{@render children()}
</ButtonText>
