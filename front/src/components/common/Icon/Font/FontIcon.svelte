<script lang="ts">
    import './style.css'
	import type { FontIconProps } from './types';

    let { name }: FontIconProps = $props();
</script>

<i class="icon {name}"></i>