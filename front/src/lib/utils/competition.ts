import { checkIsNullOrUndefined } from "./validation";

export function getCompetitionUrl(competitionId: string | null) {
    if (checkIsNullOrUndefined(competitionId)) {
        console.error('Não foi possível carregar URL da competição. ID da competição inválido.')
        return null
    }

    return `https://www.worldcubeassociation.org/competitions/${competitionId}`
}