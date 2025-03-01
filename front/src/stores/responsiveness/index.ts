import { writable, type Writable } from 'svelte/store';
import type { ResponsivenessStore } from './types';

export const responsivenessStore: Writable<ResponsivenessStore> = writable({
	isSmallDevice: false
});
