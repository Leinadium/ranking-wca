<script lang="ts">
	import { COLOR_TOKENS } from '$lib/tokens';
	import type { DividerProps } from './types';
	import './style.css';

	let {
		isVertical = false,
		size = 'FULL',
		thickness = 1,
		color = 'NEUTRAL_BASE'
	}: DividerProps = $props();

	const SIZE_OPTIONS: { [key: string]: string } = {
		FULL: isVertical ? 'auto' : '100%'
	};

	const formattedSize = SIZE_OPTIONS?.[size] || `${size}px`;
	const customStyle = `
		background-color: ${COLOR_TOKENS[color]};
		height: ${isVertical ? formattedSize : `${thickness}px`};
		width: ${isVertical ? `${thickness}px` : formattedSize};
	`;
</script>

<hr class="divider" style={customStyle} />
