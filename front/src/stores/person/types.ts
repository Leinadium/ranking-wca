import type {
	PersonCurrentRecordsViewModel,
	PersonEventResultViewModel,
	PersonImageViewModel,
	PersonInfoViewModel,
	PeopleSearchViewModel
} from '../../viewModels/person/types';

export interface PersonStore extends PersonInfoViewModel, PersonImageViewModel {
	imageUrl: string | null;
	currentRecords: PersonCurrentRecordsViewModel[];
	rankings: { [key: string]: PersonEventResultViewModel[] }; // TODO: Melhorar tipagem
	isLoading: boolean;
	search: PeopleSearchViewModel;
}
