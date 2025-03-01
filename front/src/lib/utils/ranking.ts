import { RANKING_PODIUM_POSITION_LIMIT } from '$lib/constants/ranking';
import { checkIsNullOrUndefined } from './validation';

export function checkShouldHighlightPosition(
	position: number | null,
	podiumLimitPosition: number | null = RANKING_PODIUM_POSITION_LIMIT
) {
	return !checkIsNullOrUndefined(position) && (position as number) <= podiumLimitPosition;
}
