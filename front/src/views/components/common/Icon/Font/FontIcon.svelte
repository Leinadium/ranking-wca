<script lang="ts">
	import type { FontIconProps } from './types';
    import './style.css';

    let { name }: FontIconProps = $props();
</script>

<i class="font-icon {name}"></i>