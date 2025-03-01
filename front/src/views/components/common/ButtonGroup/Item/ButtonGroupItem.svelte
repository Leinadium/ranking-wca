<script lang="ts">
	import ButtonRoot from '../../Button/Root/ButtonRoot.svelte';
	import type { ButtonRootProps } from '../../Button/Root/types';

	let { children, ...props }: ButtonRootProps = $props();
</script>

<ButtonRoot {...props}>
	{@render children?.({ ...props })}
</ButtonRoot>
