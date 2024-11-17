import type { ShowErrorMessageArgs, ShowSuccessMessageArgs } from "./types";

export function showErrorMessage(args: ShowErrorMessageArgs): void { //, enqueueSnackbarFn, intl
    const customMessage = args?.friendlyMessage || args.technicalMessage;

    // TODO: Implementar exibição de toast
    console.log('friendlyMessage:', customMessage)
    
    if (!args.technicalMessage) return;
    
    console.error(args.technicalMessage);
}

export function showSuccessMessage(args: ShowSuccessMessageArgs): void { // enqueueSnackbarFn, intl
    // TODO: Implementar exibição de toast
}