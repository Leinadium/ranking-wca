<script lang="ts">
	import type { AvatarProps } from './types';
	import { fromPixelToRem } from '$lib/utils/style';
	import { SPACING_FACTOR } from '$lib/tokens';
	import './style.css';

    let { imageUrl, margin }: AvatarProps = $props();
</script>

<div
	class="avatar"
	style={`margin: 0rem ${margin ? fromPixelToRem(margin * SPACING_FACTOR) : ''}rem`}
>
	<img src={imageUrl} alt={'Avatar com imagem do usuário'}>
</div>