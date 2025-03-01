import Toastify from 'toastify-js';
import type { ShowErrorMessageArgs, ShowSuccessMessageArgs } from "./types";
import { COLOR_TOKENS, FONT_FAMILY_TOKENS, FONT_SIZE_TOKENS, LINE_HEIGHT_TOKENS, SPACING_FACTOR } from '$lib/tokens';
import { fromPixelToRem } from '../style';

const TOAST_COMMON_CONFIGURATIONS: Toastify.Options = {
    duration: 3000, // ms
    close: true,
    gravity: "bottom",
    position: "center",
    stopOnFocus: true,
    style: {
        fontFamily: FONT_FAMILY_TOKENS.SECONDARY,
        fontSize: FONT_SIZE_TOKENS.SMALLER_1,
        lineHeight: LINE_HEIGHT_TOKENS.MEDIUM_FONT,
        gap: `${fromPixelToRem(2 * SPACING_FACTOR)}rem`,
        padding: `${fromPixelToRem(2 * SPACING_FACTOR)}rem ${fromPixelToRem(3 * SPACING_FACTOR)}rem`,
    },
}

export function showErrorMessage(args: ShowErrorMessageArgs): void {
    const customMessage = args?.friendlyMessage || args.technicalMessage;

    Toastify({
        ...TOAST_COMMON_CONFIGURATIONS,
        text: args.friendlyMessage,
        style: {
            ...TOAST_COMMON_CONFIGURATIONS.style,
            background: COLOR_TOKENS.ACCENT_NEGATIVE_BASE,
            color: COLOR_TOKENS.ACCENT_NEGATIVE_DARK_3,
            
        },
    }).showToast();

    if (!args.technicalMessage) return;
    
    console.error(args.technicalMessage);
}

export function showSuccessMessage(args: ShowSuccessMessageArgs): void {
    Toastify({
        ...TOAST_COMMON_CONFIGURATIONS,
        text: args.friendlyMessage,
        style: {
            ...TOAST_COMMON_CONFIGURATIONS.style,
            background: COLOR_TOKENS.ACCENT_POSITIVE_BASE,
            color: COLOR_TOKENS.ACCENT_POSITIVE_DARK_2,
        },
    }).showToast();
}