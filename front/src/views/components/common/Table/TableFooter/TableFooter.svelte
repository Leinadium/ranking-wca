<script lang="ts">
	import type { TableFooterProps } from './types';
	import './style.css';

	let { children }: TableFooterProps = $props();
</script>

<tfoot class="table__footer">
	{@render children()}
</tfoot>
