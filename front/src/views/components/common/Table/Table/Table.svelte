<script lang="ts">
	import type { TableProps } from './types';
	import './style.css';

	let { children }: TableProps = $props();
</script>

<div class="table">
	{@render children()}
</div>
