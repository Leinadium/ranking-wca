import type { PersonCurrentRecordsModel, PersonEventResultModel, PeopleSearchResultModel } from "../../models/person";
import type { PersonCurrentRecordsViewModel, PersonEventResultViewModel, PeopleSearchResultViewModel } from "../../viewModels/person/types";
import type { APIPersonInfoResponse, UIPersonInfoResponse, APIPersonImageResponse, UIPersonImageResponse, APIPersonCurrentRecordsResponse, UIPersonCurrentRecordsResponse, APIPersonRankingByModeResponse, UIPersonRankingByModeResponse, APIPeopleBySearchResponse, UIPeopleBySearchResponse } from "./types";

export const personAdapter = {
  formatInfoToUI(APIResponse: APIPersonInfoResponse): UIPersonInfoResponse {
    return {
      ok: APIResponse.ok,
      statusCode: APIResponse.statusCode,
      data: {
        name: APIResponse.data.name,
        stateId: APIResponse.data.state,
        isRegistered: APIResponse.data.registered,
        totalCompetitionsCount: APIResponse.data.totalCompetitions,
        stateCompetitionsCount: APIResponse.data.stateCompetitions,
      },
    };
  },

  formatImageToUI(APIResponse: APIPersonImageResponse): UIPersonImageResponse {
    return {
      ok: APIResponse.ok,
      statusCode: APIResponse.statusCode,
      data: {
        imageUrl: APIResponse.data.person.avatar.url,
      },
    };
  },

  formatCurrentRecordsToUI(APIResponse: APIPersonCurrentRecordsResponse): UIPersonCurrentRecordsResponse {
    return {
      ok: APIResponse.ok,
      statusCode: APIResponse.statusCode,
      data: APIResponse.data.map((recordObject: PersonCurrentRecordsModel): PersonCurrentRecordsViewModel => {
        return {
          eventId: recordObject.event,
          single: recordObject.single,
          average: recordObject.average,
          rankingSingle: recordObject.rankingSingle,
          rankingAverage: recordObject.rankingAverage,
        }
      }),
    };
  },

  formatRankingByModeToUI(APIResponse: APIPersonRankingByModeResponse): UIPersonRankingByModeResponse {    
    return {
      ok: APIResponse.ok,
      statusCode: APIResponse.statusCode,
      data: {
        // eventId: recordObject.event,
        name: APIResponse.data.name,
        stateId: APIResponse.data.state,
        isRegistered: APIResponse.data.registered,
        rankings: APIResponse.data.rankings?.map((rankingObject: PersonEventResultModel): PersonEventResultViewModel => {
          return {
            eventId: rankingObject.event,
            ranking: rankingObject.ranking,
            best: rankingObject.best,
            competitionId: rankingObject.compId,
            competitionName: rankingObject.compName,
            competitionState: rankingObject.compState,
            times: rankingObject.times,
          }
        }),
      }
    };
  },

  // TODO: Implementar totalItems quando busca estiver paginada pelo Back-end
  formatPeopleBySearchToUI(APIResponse: APIPeopleBySearchResponse): UIPeopleBySearchResponse {
    return {
      ok: APIResponse.ok,
      statusCode: APIResponse.statusCode,
      data: {
        items: APIResponse.data.results.map((recordObject: PeopleSearchResultModel): PeopleSearchResultViewModel => {
          return {
            wcaId: recordObject.wcaId,
            name: recordObject.wcaName,
            stateId: recordObject.stateId,
          }
        }),
        // totalItems: recordObject.totalItems,
      },
    };
  },
};