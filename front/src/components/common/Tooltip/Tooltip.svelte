<script lang="ts">
	import type { TooltipProps } from './types';
	import Typography from '../Typography/Typography.svelte';
	import './style.css';

    let { children, text }: TooltipProps = $props();

	let isHovered: boolean = $state(false);
	let x: number | undefined = $state();
	let y: number | undefined = $state();
	
	function handleMouseOver(event: MouseEvent): void {
		isHovered = true;
		x = event.clientX + 8;
		y = event.clientY + 8;
	}

	function handleMouseMove(event: MouseEvent): void {
		x = event.clientX + 8;
		y = event.clientY + 8;
	}

	function handleMouseLeave() {
		isHovered = false;
	}
</script>

<!-- TODO: Tratar problemas de acessibilidade indicados abaixo -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div
	onmouseover={handleMouseOver}
 	onmouseleave={handleMouseLeave}
	onmousemove={handleMouseMove}
>
	{@render children()}
</div>

{#if isHovered}
	<div class="tooltip" style="top: {y}px; left: {x}px;">
		<Typography type={'caption'} color={'NEUTRAL_DARK_1'}>{text}</Typography>
	</div>
{/if}