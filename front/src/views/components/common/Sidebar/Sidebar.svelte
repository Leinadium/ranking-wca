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
	import './style.css';

	const MENU_TOPICS: SidebarMenuTopics = [
		{
			title: 'Informação',
			items: [
				{
					icon: 'faFileLines',
					text: 'Sobre Cubos Estaduais',
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

	const customStyle = $derived(`
		width: ${sidebar.isExpanded ? '340px' : '64px'};
		padding: 32px ${sidebar.isExpanded ? '32px' : 0};
	`);

	function toogleExpansionStatus() {
		sidebar.isExpanded = !sidebar.isExpanded;
	}
</script>

<aside class="sidebar {sidebar.isExpanded ? '' : 'sidebar--collapsed'}" style={customStyle}>
	<GridItem justifyContent={'center'}>
		<img
			class="sidebar__brand"
			src={`/brand/${sidebar.isExpanded ? 'full-brand.svg' : 'brand-symbol.svg'}`}
			alt="Logo do Cubos Nacionais"
		/>

		<GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={4}>
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