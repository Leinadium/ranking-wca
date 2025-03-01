import { BASE_PIXEL_FONT_SIZE } from '$lib/tokens';

export function fromPixelToRem(pixels: number): number {
	return pixels / BASE_PIXEL_FONT_SIZE;
}
