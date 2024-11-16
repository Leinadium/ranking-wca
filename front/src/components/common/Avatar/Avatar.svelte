<script lang="ts">
	import type { AvatarProps } from './types';
	import { fromPixelToRem } from '$lib/utils/style';
	import { SPACING_FACTOR } from '$lib/tokens';
	import './style.css';

    let { imageUrl, marginH = 0, marginV = 0 }: AvatarProps = $props();
</script>

<div
	class="avatar"
	style={`margin: ${fromPixelToRem(marginV * SPACING_FACTOR)}rem ${fromPixelToRem(marginH * SPACING_FACTOR)}rem`}
>
	<img src={imageUrl} alt={'Avatar com imagem do usuário'}>
</div>