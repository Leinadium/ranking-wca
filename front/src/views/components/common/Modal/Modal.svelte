<script lang="ts">
	import type { ModalProps } from './types';
	import ButtonRoot from '../Button/Root/ButtonRoot.svelte';
	import ButtonIcon from '../Button/Icon/ButtonIcon.svelte';
	import SvgIcon from '../Icon/SVG/SVGIcon.svelte';
	import Typography from '../Typography/Typography.svelte';
	import ButtonText from '../Button/Text/ButtonText.svelte';
	import { modal } from '$lib/states/modal.svelte';
	import { closeModal } from '$lib/utils/modal';
	import Divider from '../Divider/Divider.svelte';
	import './style.css';
	import GridItem from '../Grid/Item/GridItem.svelte';

    let { children, size = 'MEDIUM', title, actionText, actionFn, isActionDisabled = false }: ModalProps = $props();
	
	const TYPE_CLASSES = {
        size: {
            SMALL: 'modal__content--sm',
            MEDIUM: 'modal__content--md',
            LARGE: 'modal__content--lg',
        },
    };

	let customStyle = $derived(`
		display: ${modal.isOpened ? 'flex' : 'none'};
	`);

	function handleOutsideClick(event: MouseEvent) {
		if (event.target !== event.currentTarget) return
		closeModal();
	}

	function handleActionButtonClick() {
		actionFn()
		closeModal()
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="modal" style={customStyle} onclick={handleOutsideClick}>
	<GridItem gap={3} classes={`modal__content ${TYPE_CLASSES.size[size]}`}>
		<GridItem gap={1} classes={'modal__header'} wrap={'NOWRAP'} justifyContent={'space-between'}>
			<Typography type={'h3'} color={'NEUTRAL_DARK_2'}>
				{title}
			</Typography>

			<ButtonRoot type={'BASIC'} size={'SMALL'} color={'NEUTRAL'} onClickFn={closeModal}>
				<ButtonIcon>
					<SvgIcon name={'faTimes'}></SvgIcon>
				</ButtonIcon>
			</ButtonRoot>
		</GridItem>

		<Divider thickness={1} color={'NEUTRAL_BASE'} />
		
		<GridItem gap={1} classes={'modal__body'} justifyContent={'space-between'}>
			{@render children?.()}
		</GridItem>
		
		<GridItem gap={1} classes={'modal__footer'} justifyContent={'flex-end'}>
			<ButtonRoot
				type={'FILLED'}
				size={'SMALL'}
				color={'PRIMARY'}
				onClickFn={handleActionButtonClick}
				disabled={isActionDisabled}
			>
				<ButtonText>{actionText}</ButtonText>
			</ButtonRoot>
		</GridItem>
	</GridItem>
</div>