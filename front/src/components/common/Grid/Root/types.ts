import type { Snippet } from "svelte";

export interface GridRootProps {
    children: Snippet<[]>;
    margin?: number;
    gap?: number;
};