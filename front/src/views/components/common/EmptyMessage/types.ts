import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import type { Snippet } from 'svelte';

export interface EmptyMessageProps {
	iconName?: keyof typeof solidIcons;
	children?: Snippet<[]>;
}
