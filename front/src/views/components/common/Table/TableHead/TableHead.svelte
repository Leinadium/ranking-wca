<script lang="ts">
	import type { TableHeadProps } from './types';
	import './style.css';

	let { children }: TableHeadProps = $props();
</script>

<thead class="table__head">
	{@render children()}
</thead>
