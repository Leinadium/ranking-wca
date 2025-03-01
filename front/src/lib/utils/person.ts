import { personAdapter } from '../../adapters/person';
import type { APIPersonImageResponse, UIPersonImageResponse } from '../../adapters/person/types';
import { personService } from '../../services/person';
import type { GetPersonImageArgs } from '../../services/person/types';

export async function getPersonImage(args: GetPersonImageArgs) {
	const APIResponse: APIPersonImageResponse = await personService.getImage(args);
	const adaptedResponse: UIPersonImageResponse = personAdapter.formatImageToUI(APIResponse);

	return adaptedResponse.data.imageUrl;
}
