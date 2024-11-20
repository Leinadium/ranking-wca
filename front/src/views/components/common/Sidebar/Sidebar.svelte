<script lang="ts">
	import type { SidebarMenuTopics } from './types';
	import GridItem from '../Grid/Item/GridItem.svelte';
	import Typography from '../Typography/Typography.svelte';
	import ButtonRoot from '../Button/Root/ButtonRoot.svelte';
	import ButtonIcon from '../Button/Icon/ButtonIcon.svelte';
	import SvgIcon from '../Icon/SVG/SVGIcon.svelte';
	import ButtonText from '../Button/Text/ButtonText.svelte';
	import Tooltip from '../Tooltip/Tooltip.svelte';
	import { EXTERNAL_ROUTES, INTERNAL_ROUTES } from '$lib/constants/routes';
	import { sidebar } from '$lib/states/sidebar.svelte';
	import { BRAND_NAME } from '$lib/utils/general';
	import { fromPixelToRem } from '$lib/utils/style';
	import { SPACING_FACTOR } from '$lib/tokens';
	import './style.css';

	const MENU_TOPICS: SidebarMenuTopics = [
		{
			title: 'Informação',
			items: [
				{
					icon: 'faFileLines',
					text: `Sobre ${BRAND_NAME}`,
					link: INTERNAL_ROUTES.MAIN,
				},
			],
		},
		{
			title: 'Resultados',
			items: [
				{
					icon: 'faRankingStar',
					text: 'Ranking',
					link: INTERNAL_ROUTES.RANKING,
				},
				{
					icon: 'faPeopleGroup',
					text: 'Pessoas',
					link: INTERNAL_ROUTES.PEOPLE,
				},
			],
		},
		{
			title: 'Regulamento Mundial',
			items: [
				{
					icon: 'faInfoCircle',
					text: 'Sobre o regulamento',
					link: 	EXTERNAL_ROUTES.ABOUTE_REGULATIONS,
					linkTarget: '_blank',
				},
				{
					icon: 'faBook',
					text: 'Regulamentos e orientações',
					link: 	EXTERNAL_ROUTES.REGULATIONS_AND_GUIDELINES,
					linkTarget: '_blank',
				},
				{
					icon: 'faClipboardList',
					text: 'Regulamento',
					link: 	EXTERNAL_ROUTES.REGULATIONS,
					linkTarget: '_blank',
				},
				{
					icon: 'faDirections',
					text: 'Orientações',
					link: 	EXTERNAL_ROUTES.GUIDELINES,
					linkTarget: '_blank',
				},
				{
					icon: 'faShuffle',
					text: 'Embaralhamentos',
					link: 	EXTERNAL_ROUTES.SCRAMBLES,
					linkTarget: '_blank',
				},
			],
		},
	];

	// TODO: Melhorar estilização de tamanho
	const customStyle = $derived(`
		min-width: ${sidebar.isExpanded ? '352px' : '64px'};
		max-width: ${sidebar.isExpanded ? '352px' : '64px'};
		padding: 32px ${sidebar.isExpanded ? '32px' : '8px'};
	`);

	function toogleExpansionStatus() {
		sidebar.isExpanded = !sidebar.isExpanded;
	}
</script>

<aside class="sidebar {sidebar.isExpanded ? '' : 'sidebar--collapsed'}" style={customStyle}>
	<GridItem justifyContent={'center'}>
		<GridItem
			classes="sidebar__brand"
			alignItems={'center'}
			margin={`0 0 ${fromPixelToRem(9 * SPACING_FACTOR)}rem`}
			gap={2}
		>
			<img
				class="sidebar__image--brand"
				src="/brand/brand-symbol.svg"
				alt="Logo do {BRAND_NAME}"
			/>
			
			{#if sidebar.isExpanded}
				<Typography type="h1" color="PRIMARY_DARK_1">{BRAND_NAME}</Typography>
			{/if}
		</GridItem>

		{#key sidebar.isExpanded}
		<GridItem
			direction={'COLUMN'}
			alignItems={sidebar.isExpanded ? 'flex-start' : 'center'}
			gap={4}
		>
			{#each MENU_TOPICS as topic}
				<GridItem direction={'COLUMN'} alignItems={'flex-start'}>
					{#if sidebar.isExpanded}
						<Typography type="h6" color="NEUTRAL_DARK_2">{topic.title}</Typography>
					{/if}

					{#each topic.items as item}
						<ButtonRoot type={'BASIC'} color={'NEUTRAL'} href={item.link} target={item.linkTarget}>
							<Tooltip text={item.text}>
								<ButtonIcon>
									<SvgIcon name={item.icon}></SvgIcon>
								</ButtonIcon>
							</Tooltip>

							{#if sidebar.isExpanded}
								<ButtonText>{item.text}</ButtonText>
							{/if}
						</ButtonRoot>
					{/each}
				</GridItem>
			{/each}
		</GridItem>
		{/key}
	</GridItem>

	<ButtonRoot
		type={'OUTLINED'}
		color={'NEUTRAL'}
		classes={'sidebar__button--collapse'}
		onClickFn={toogleExpansionStatus}
	>
		<ButtonIcon>
			{#if sidebar.isExpanded}
				<SvgIcon name={'faArrowLeft'}></SvgIcon>
			{:else}
				<SvgIcon name={'faArrowRight'}></SvgIcon>
			{/if}
		</ButtonIcon>
	</ButtonRoot>
</aside>