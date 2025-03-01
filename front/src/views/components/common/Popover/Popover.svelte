<script lang="ts">
	import { onMount } from 'svelte';
	import { debounce } from '$lib/utils/debounce';
	import type { PopoverProps } from './types';
	import './style.css';

	let { id, position = 'auto' }: PopoverProps = $props();

	let popover = $state<HTMLElement | null>(null);
	let triggerElement = $state<HTMLElement | null>(null);
	let isVisible = $state<boolean>(false);
	let positionStyle = $state({ top: 0, left: 0, transform: '' });

	const customStyle = $derived(`
		top: ${positionStyle.top}px;
		left: ${positionStyle.left}px;
		transform: ${positionStyle.transform};
	`);

	function preventOverflowOnScreen(position: { top: number; left: number }, popoverRect: DOMRect): { top: number; left: number } {
		const borderSpacing = 10 // Margem desejada em pixels em relação à borda da tela

		// Evita transbordamento da borda direita
		if (position.left + popoverRect.width > window.innerWidth) {
			position.left = window.innerWidth - popoverRect.width - borderSpacing;
		}

		// Evita transbordamento da borda esquerda
		if (position.left < 0) {
			position.left = borderSpacing;
		}

		// Evita transbordamento da borda inferior
		if (position.top + popoverRect.height > window.innerHeight) {
			position.top = window.innerHeight - popoverRect.height - borderSpacing;
		}

		return position;
	}

	function centerHorizontally(triggerRect: DOMRect, popoverRect: DOMRect): number {
		return triggerRect.left + (triggerRect.width - popoverRect.width) / 2 + window.scrollX;
	}

	function positionAuto(triggerRect: DOMRect, popoverRect: DOMRect, availableSpace: any): { top: number; left: number } {
		const possiblePositions = [
			{ type: 'bottom', condition: availableSpace.bottom >= popoverRect.height },
			{ type: 'top', condition: availableSpace.top >= popoverRect.height },
			{ type: 'right', condition: availableSpace.right >= popoverRect.width },
			{ type: 'left', condition: availableSpace.left >= popoverRect.width }
		];
		const selectedPosition = possiblePositions.find(positionAlternative => positionAlternative.condition)?.type || 'bottom';

		return positionCalculations[selectedPosition](triggerRect, popoverRect);
	}

	const positionCalculations: { [key: string]: Function } = {
		auto: positionAuto, // Posição automática, escolhendo a melhor posição com base no espaço disponível
		top: (triggerRect: DOMRect, popoverRect: DOMRect) => ({
			top: triggerRect.top - popoverRect.height + window.scrollY,
			left: centerHorizontally(triggerRect, popoverRect)
		}),
		bottom: (triggerRect: DOMRect, popoverRect: DOMRect) => ({
			top: triggerRect.bottom + window.scrollY,
			left: centerHorizontally(triggerRect, popoverRect)
		}),
		left: (triggerRect: DOMRect, popoverRect: DOMRect) => ({
			top: triggerRect.top + (triggerRect.height - popoverRect.height) / 2 + window.scrollY,
			left: triggerRect.left - popoverRect.width + window.scrollX
		}),
		right: (triggerRect: DOMRect, popoverRect: DOMRect) => ({
			top: triggerRect.top + (triggerRect.height - popoverRect.height) / 2 + window.scrollY,
			left: triggerRect.right + window.scrollX
		})
	};

	function positionPopover() {
		if (!isVisible || !triggerElement || !popover) return;

		const triggerRect = triggerElement.getBoundingClientRect();
		const popoverRect = popover.getBoundingClientRect();

		// Espaço disponível ao redor do elemento trigger
		const availableSpace = {
			top: triggerRect.top + window.scrollY,
			bottom: window.innerHeight - triggerRect.bottom + window.scrollY,
			left: triggerRect.left + window.scrollX,
			right: window.innerWidth - triggerRect.right + window.scrollX
		};

		const positionFunction = positionCalculations[position] || positionCalculations.auto;
		let newPositionStyle = positionFunction(triggerRect, popoverRect, availableSpace);
		newPositionStyle = preventOverflowOnScreen(newPositionStyle, popoverRect);

		positionStyle = { top: newPositionStyle.top, left: newPositionStyle.left, transform: 'translate(-50%, 0)' };
	}

	let resizeTimeout: any;

	function handleScreenResize() {
		clearTimeout(resizeTimeout);
		resizeTimeout = debounce(positionPopover, 100) // Delay de 100ms (debounce)
	}

	function handlePopoverVisibilityToggle(event: unknown) {
		isVisible = event?.newState === 'open' || false
		positionPopover()
	}

	onMount(() => {
		triggerElement = document.querySelector(`button[popovertarget="${id}"]`);

		window.addEventListener('resize', handleScreenResize);
		popover?.addEventListener('toggle', handlePopoverVisibilityToggle);

		return () => {
			window.removeEventListener('resize', handleScreenResize);
			popover?.removeEventListener('toggle', handlePopoverVisibilityToggle);
		};
	});
</script>

<div
	bind:this={popover}
	class="popover"
	id={id}
	popover={'auto'}
	style={customStyle}
>
	Popover content
</div>