import { writable, type Writable } from 'svelte/store';
import type { RankingStore } from './types';

export const rankingStore: Writable<RankingStore> = writable({
  items: [],
  totalItems: 0,
  isLoading: false,
});
