import { writable, type Writable } from 'svelte/store';
import type { PersonStore } from './types';

export const personStore: Writable<PersonStore> = writable({
  name: null,
  stateId: null,
  isRegistered: null,
  totalCompetitionsCount: null,
  stateCompetitionsCount: null,
  imageUrl: null,
  currentRecords: {
    data: [],
		totalItems: 0,
		itemsPerPage: 0,
		currentPage: 1,
		sortDirection: 'asc',
		sortColumn: 'eventId',
		sortedData: [],
		paginatedData: [],
  },
  isLoading: false,
});
