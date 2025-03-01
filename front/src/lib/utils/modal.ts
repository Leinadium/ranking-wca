import { modal } from "$lib/states/modal.svelte";

export function openModal() {
    modal.isOpened = true
};

export function closeModal() {
    modal.isOpened = false
};