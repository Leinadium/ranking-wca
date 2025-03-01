import { writable, type Writable } from 'svelte/store';
import type { UpdateStore } from './types';

export const updateStore: Writable<UpdateStore> = writable({
	lastUpdatedAt: null,
	isLoading: false
});
