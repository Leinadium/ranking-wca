<script lang="ts">
	import ButtonGroupRoot from '../../../components/common/ButtonGroup/Root/ButtonGroupRoot.svelte';
	import ButtonGroupItem from '../../../components/common/ButtonGroup/Item/ButtonGroupItem.svelte';
	import GridItem from '../../../components/common/Grid/Item/GridItem.svelte';
	import InputGroupRoot from '../../../components/common/InputGroup/Root/InputGroupRoot.svelte';
	import InputGroupLabel from '../../../components/common/InputGroup/Label/InputGroupLabel.svelte';
	import Select from '../../../components/common/Select/Select.svelte';
	import ButtonGroupIcon from '../../../components/common/ButtonGroup/Icon/ButtonGroupIcon.svelte';
	import FontIcon from '../../../components/common/Icon/Font/FontIcon.svelte';
	import Tooltip from '../../../components/common/Tooltip/Tooltip.svelte';
	import { EVENT_LIST } from '$lib/constants/events';

	// TODO: Pensar como melhorar as options evitando repetição de código
	const EVENT_FILTER_OPTIONS = [
		{
			icon: EVENT_LIST['333'].icon,
			name: EVENT_LIST['333'].name,
			value: '333'
		},
		{
			icon: EVENT_LIST['222'].icon,
			name: EVENT_LIST['222'].name,
			value: '222'
		},
		{
			icon: EVENT_LIST['444'].icon,
			name: EVENT_LIST['444'].name,
			value: '444'
		},
		{
			icon: EVENT_LIST['555'].icon,
			name: EVENT_LIST['555'].name,
			value: '555'
		},
		{
			icon: EVENT_LIST['666'].icon,
			name: EVENT_LIST['666'].name,
			value: '666'
		},
		{
			icon: EVENT_LIST['777'].icon,
			name: EVENT_LIST['777'].name,
			value: '777'
		},
		{
			icon: EVENT_LIST['333bf'].icon,
			name: EVENT_LIST['333bf'].name,
			value: '333bf'
		},
		{
			icon: EVENT_LIST['333fm'].icon,
			name: EVENT_LIST['333fm'].name,
			value: '333fm'
		},
		{
			icon: EVENT_LIST['333ft'].icon,
			name: EVENT_LIST['333ft'].name,
			value: '333ft'
		},
		{
			icon: EVENT_LIST['333oh'].icon,
			name: EVENT_LIST['333oh'].name,
			value: '333oh'
		},
		{
			icon: EVENT_LIST['clock'].icon,
			name: EVENT_LIST['clock'].name,
			value: 'clock'
		},
		{
			icon: EVENT_LIST['minx'].icon,
			name: EVENT_LIST['minx'].name,
			value: 'minx'
		},
		{
			icon: EVENT_LIST['pyram'].icon,
			name: EVENT_LIST['pyram'].name,
			value: 'pyram'
		},
		{
			icon: EVENT_LIST['skewb'].icon,
			name: EVENT_LIST['skewb'].name,
			value: 'skewb'
		},
		{
			icon: EVENT_LIST['sq1'].icon,
			name: EVENT_LIST['sq1'].name,
			value: 'sq1'
		},
		{
			icon: EVENT_LIST['444bf'].icon,
			name: EVENT_LIST['444bf'].name,
			value: '444bf'
		},
		{
			icon: EVENT_LIST['555bf'].icon,
			name: EVENT_LIST['555bf'].name,
			value: '555bf'
		},
		{
			icon: EVENT_LIST['333mbf'].icon,
			name: EVENT_LIST['333mbf'].name,
			value: '333mbf'
		}
	];
	// TODO: Habilitar opção "Todos" quando back-end suportar
	const STATE_FILTER_OPTIONS = [
		// {
		// 	label: 'Todos',
		// 	value: 'BR',
		// },
		{
			label: 'Rio de Janeiro',
			value: 'RJ'
		},
		{
			label: 'São Paulo',
			value: 'SP'
		}
	];
	const TYPE_FILTER_OPTIONS = [
		{
			label: 'Tempo único',
			value: 'single'
		},
		{
			label: 'Média',
			value: 'average'
		}
	];

	// TODO: Adicionar tipagem
	const { filters, updateFiltersFn } = $props();
</script>

<GridItem direction={'ROW'} justifyContent={'start'} alignItems={'flex-start'} gap={4}>
	{#key filters.eventId}
		<InputGroupRoot>
			<InputGroupLabel text={'Evento'} />
			<ButtonGroupRoot>
				{#each EVENT_FILTER_OPTIONS as event}
					<Tooltip text={event.name}>
						<ButtonGroupItem
							color="PRIMARY"
							type={filters.eventId === event.value ? 'FILLED' : 'OUTLINED'}
							onClickFn={() => updateFiltersFn('eventId', event.value)}
						>
							<ButtonGroupIcon>
								<FontIcon name={event.icon} />
							</ButtonGroupIcon>
						</ButtonGroupItem>
					</Tooltip>
				{/each}
			</ButtonGroupRoot>
		</InputGroupRoot>
	{/key}

	<InputGroupRoot>
		<InputGroupLabel text={'Estado'} />
		<Select
			options={STATE_FILTER_OPTIONS}
			value={filters.stateId}
			onChangeFn={(event) => updateFiltersFn('stateId', event?.target?.value)}
		/>
	</InputGroupRoot>

	<InputGroupRoot>
		<InputGroupLabel text={'Tipo'} />
		<Select
			options={TYPE_FILTER_OPTIONS}
			value={filters.competitionMode}
			onChangeFn={(event) => updateFiltersFn('competitionMode', event?.target?.value)}
		/>
	</InputGroupRoot>
</GridItem>
