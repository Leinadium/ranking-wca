<script lang="ts">
	import SvgIcon from '../Icon/SVG/SVGIcon.svelte';
	import Tooltip from '../Tooltip/Tooltip.svelte';
	import type { VerifiedAccountFlagProps } from './types';

	let { isVerified }: VerifiedAccountFlagProps = $props();
</script>

<Tooltip text={isVerified ? 'Conta verificada' : 'Verificação de conta pendente'}>
	<SvgIcon
		name={isVerified ? 'faCircleCheck' : 'faCircleExclamation'}
		color={isVerified ? 'PRIMARY_LIGHT_1' : 'ACCENT_WARNING_BASE'}
	/>
</Tooltip>
