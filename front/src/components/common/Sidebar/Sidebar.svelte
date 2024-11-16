<script lang="ts">
	import type { SidebarMenuTopics, SidebarProps } from './types';
	import GridItem from '../Grid/Item/GridItem.svelte';
	import Typography from '../Typography/Typography.svelte';
	import ButtonRoot from '../Button/Root/ButtonRoot.svelte';
	import ButtonIcon from '../Button/Icon/ButtonIcon.svelte';
	import SvgIcon from '../Icon/SVG/SVGIcon.svelte';
	import ButtonText from '../Button/Text/ButtonText.svelte';
	import Tooltip from '../Tooltip/Tooltip.svelte';
	import './style.css';

    let { isExpanded }: SidebarProps = $props();

	const MENU_TOPICS: SidebarMenuTopics = [
		{
			title: 'Informação',
			items: [
				{
					icon: 'faFileLines',
					text: 'Sobre Cubos Estaduais',
				},
			],
		},
		{
			title: 'Resultados',
			items: [
				{
					icon: 'faRankingStar',
					text: 'Ranking',
				},
				{
					icon: 'faPeopleGroup',
					text: 'Pessoas',
				},
			],
		},
		{
			title: 'Regulamento Mundial',
			items: [
				{
					icon: 'faInfoCircle',
					text: 'Sobre o regulamento',
				},
				{
					icon: 'faBook',
					text: 'Regulamentos e orientações',
				},
				{
					icon: 'faClipboardList',
					text: 'Regulamento',
				},
				{
					icon: 'faDirections',
					text: 'Orientações',
				},
				{
					icon: 'faShuffle',
					text: 'Embaralhamentos',
				},
			],
		},
	];

	const customStyle = `
		width: ${isExpanded ? '340px' : '64px'};
		padding: 32px ${isExpanded ? '32px' : 0};
	`;
</script>

<aside class="sidebar {isExpanded ? '' : 'sidebar--collapsed'}" style={customStyle}>
	<GridItem justifyContent={'center'}>
		<img
			class="sidebar__brand"
			src={`/brand/${isExpanded ? 'full-brand.svg' : 'brand-symbol.svg'}`}
			alt="Logo do Cubos Nacionais"
		/>

		<GridItem direction={'COLUMN'} alignItems={'flex-start'} gap={4}>
			{#each MENU_TOPICS as topic}
				<GridItem direction={'COLUMN'} alignItems={'flex-start'}>
					{#if isExpanded}
						<Typography type="h6" color="NEUTRAL_DARK_2">{topic.title}</Typography>
					{/if}

					{#each topic.items as item}
						<ButtonRoot type={'BASIC'} color={'NEUTRAL'}>
							<Tooltip text={item.text}>
								<ButtonIcon>
									<SvgIcon name={item.icon}></SvgIcon>
								</ButtonIcon>
							</Tooltip>

							{#if isExpanded}
								<ButtonText>{item.text}</ButtonText>
							{/if}
						</ButtonRoot>
					{/each}
				</GridItem>
			{/each}
		</GridItem>
	</GridItem>

	<!-- TODO: Implementar collapse do menu lateral -->
	<ButtonRoot type={'OUTLINED'} color={'NEUTRAL'} classes={'sidebar__button--collapse'}>
		<ButtonIcon>
			<SvgIcon name={isExpanded ? 'faArrowLeft' : 'faArrowRight'}></SvgIcon>
		</ButtonIcon>
	</ButtonRoot>
</aside>