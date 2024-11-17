import type { Snippet } from "svelte";

export interface GridRootProps {
    children: Snippet<[]>;
    marginH?: number;
    marginV?: number;
    gap?: number;
};