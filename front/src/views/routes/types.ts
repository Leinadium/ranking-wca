import type { Snippet } from "svelte";
import type { PageData } from "./$types";

export interface RootLayoutProps { 
    data: PageData;
    children: Snippet<[]>;
}