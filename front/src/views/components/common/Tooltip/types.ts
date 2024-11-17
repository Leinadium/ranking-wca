import type { Snippet } from "svelte";

export interface TooltipProps {
    children: Snippet<[]>;
    text: string;
}