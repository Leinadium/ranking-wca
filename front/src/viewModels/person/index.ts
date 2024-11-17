import { personAdapter } from "../../adapters/person";
import type { APIPersonCurrentRecordsResponse, APIPersonImageResponse, APIPersonInfoResponse, APIPersonRankingByModeResponse, UIPersonCurrentRecordsResponse, UIPersonImageResponse, UIPersonInfoResponse, UIPersonRankingByModeResponse } from "../../adapters/person/types";
import { personService } from "../../services/person";
import type { GetPersonCurrentRecordsArgs, GetPersonImageArgs, GetPersonInfoArgs, GetPersonRankingByModeArgs } from "../../services/person/types";
import { personStore } from "../../stores/person";

export const loadPersonInfo = async (args: GetPersonInfoArgs) => {
  personStore.update((state) => ({
    ...state,
    isLoading: true,
  }));

  const APIResponse: APIPersonInfoResponse = await personService.getInfo(args);
  const adaptedResponse: UIPersonInfoResponse = personAdapter.formatInfoToUI(APIResponse);

  personStore.update((state) => ({
    ...state,
    name: adaptedResponse.data.name,
    stateId: adaptedResponse.data.stateId,
    isRegistered: adaptedResponse.data.isRegistered,
    totalCompetitionsCount: adaptedResponse.data.totalCompetitionsCount,
    stateCompetitionsCount: adaptedResponse.data.stateCompetitionsCount,
    isLoading: false,
  }));
};

export const loadPersonImage = async (args: GetPersonImageArgs) => {
  personStore.update((state) => ({
    ...state,
    isLoading: true,
  }));

  const APIResponse: APIPersonImageResponse = await personService.getImage(args);
  const adaptedResponse: UIPersonImageResponse = personAdapter.formatImageToUI(APIResponse);

  personStore.update((state) => ({
    ...state,
    imageUrl: adaptedResponse.data.imageUrl,
    isLoading: false,
  }));
};

export const loadPersonCurrentRecords = async (args: GetPersonCurrentRecordsArgs) => {
  personStore.update((state) => ({
    ...state,
    isLoading: true,
  }));

  const APIResponse: APIPersonCurrentRecordsResponse = await personService.getCurrentRecords(args);
  const adaptedResponse: UIPersonCurrentRecordsResponse = personAdapter.formatCurrentRecordsToUI(APIResponse);

  personStore.update((state) => ({
    ...state,
    isLoading: false,
    currentRecords: adaptedResponse.data,
  }));
};

export const loadPersonRankingByModeRecords = async (args: GetPersonRankingByModeArgs) => {
  personStore.update((state) => ({
    ...state,
    isLoading: true,
  }));

  const APIResponse: APIPersonRankingByModeResponse = await personService.getRankingByMode(args);
  const adaptedResponse: UIPersonRankingByModeResponse = personAdapter.formatRankingByModeToUI(APIResponse);

  personStore.update((state) => ({
    ...state,
    isLoading: false,
    rankings: {
      ...state.rankings,
      [args.mode]: adaptedResponse.data.rankings,
    },
  }));
};
