<script lang="ts">
	import type { PopoverProps } from './types';
	import { onMount } from 'svelte';
	import './style.css';

    let { id, position = 'auto' }: PopoverProps = $props();
	let popover = $state(null)
	let triggerElement = $state(null)
	let isVisible: boolean = $state(false)
	let positionStyle = $state({ top: 0, left: 0, transform: '' })
	const customStyle = $derived(`
		top: ${positionStyle.top}px;
		left: ${positionStyle.left}px;
		transform: ${positionStyle.transform};
		display: ${isVisible ? 'block' : 'none'};
	`)

	function positionPopover() {
		if (!isVisible || !triggerElement || !popover) return;

		const buttonRect = triggerElement.getBoundingClientRect();
		const popoverRect = popover.getBoundingClientRect();

		let top = 0;
		let left = 0;

		// Espaço disponível ao redor do elemento trigger
		const availableSpace = {
			top: buttonRect.top + window.scrollY,
			bottom: window.innerHeight - buttonRect.bottom + window.scrollY,
			left: buttonRect.left + window.scrollX,
			right: window.innerWidth - buttonRect.right + window.scrollX
		};

		if (position === 'auto') {
			if (availableSpace.bottom >= popoverRect.height) {
				// (bottom-center)
				top = buttonRect.bottom + window.scrollY;
				left = buttonRect.left + (buttonRect.width - popoverRect.width) / 2 + window.scrollX;
			} else if (availableSpace.top >= popoverRect.height) {
				// (top-center)
				top = buttonRect.top - popoverRect.height + window.scrollY;
				left = buttonRect.left + (buttonRect.width - popoverRect.width) / 2 + window.scrollX;
			} else if (availableSpace.right >= popoverRect.width) {
				// (right-middle)
				top = buttonRect.top + (buttonRect.height - popoverRect.height) / 2 + window.scrollY;
				left = buttonRect.right + window.scrollX;
			} else if (availableSpace.left >= popoverRect.width) {
				// (left-middle)
				top = buttonRect.top + (buttonRect.height - popoverRect.height) / 2 + window.scrollY;
				left = buttonRect.left - popoverRect.width + window.scrollX;
			} else {
				// (bottom-center)
				top = buttonRect.bottom + window.scrollY;
				left = buttonRect.left + (buttonRect.width - popoverRect.width) / 2 + window.scrollX;
			}
		} else if (position === 'top') {
			top = buttonRect.top - popoverRect.height + window.scrollY;
			left = buttonRect.left + (buttonRect.width - popoverRect.width) / 2 + window.scrollX;
		} else if (position === 'bottom') {
			top = buttonRect.bottom + window.scrollY;
			left = buttonRect.left + (buttonRect.width - popoverRect.width) / 2 + window.scrollX;
		} else if (position === 'left') {
			top = buttonRect.top + (buttonRect.height - popoverRect.height) / 2 + window.scrollY;
			left = buttonRect.left - popoverRect.width + window.scrollX;
		} else if (position === 'right') {
			top = buttonRect.top + (buttonRect.height - popoverRect.height) / 2 + window.scrollY;
			left = buttonRect.right + window.scrollX;
		}

		// Prevent overflow from the right edge
		if (left + popoverRect.width > window.innerWidth) {
			left = window.innerWidth - popoverRect.width - 10; // Margem de 10px da borda direita da tela
		}

		// Evita transbordamento da borda esquerda
		if (left < 0) {
			left = 10; // Margem de 10px da borda esquerda da tela
		}

		// Evita transbordamento da borda inferior
		if (top + popoverRect.height > window.innerHeight) {
			top = buttonRect.top - popoverRect.height + window.scrollY; // Position above the button if the bottom overflows
		}

		// Aplica a posição final com centralização horizontal
		positionStyle = { top, left, transform: 'translate(-50%, 0)' };
	}

	onMount(() => {
		popover.showPopover()
		triggerElement = document.querySelector(`button[popovertarget="${id}"]`)

		// TODO: Avaliar uso de debounce
		window.addEventListener('resize', positionPopover);
		
		popover?.addEventListener("toggle", (event) => {
			isVisible = event.newState !== 'open'
			positionPopover()
		});
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