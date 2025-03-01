import { writable, type Writable } from 'svelte/store';
import type { AuthStore } from './types';

export const authStore: Writable<AuthStore> = writable({
	user: null,
	loginUrl: null,
	isLoading: false
});
