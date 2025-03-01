import { writable, type Writable } from 'svelte/store';
import type { PersonStore } from './types';

export const personStore: Writable<PersonStore> = writable({
	name: null,
	stateId: null,
	isRegistered: null,
	totalCompetitionsCount: null,
	stateCompetitionsCount: null,
	imageUrl: null,
	currentRecords: [],
	rankings: {},
	isLoading: false,
	search: {
		items: [],
		totalItems: 0
	}
});
