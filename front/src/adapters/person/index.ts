import type { PersonCurrentRecordsModel } from "../../models/person";
import type { PersonCurrentRecordsViewModel } from "../../viewModels/person/types";
import type { APIPersonInfoResponse, UIPersonInfoResponse, APIPersonImageResponse, UIPersonImageResponse, APIPersonCurrentRecordsResponse, UIPersonCurrentRecordsResponse } from "./types";

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
};