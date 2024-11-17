import type { ShowErrorMessageArgs, ShowSuccessMessageArgs } from "./types";

export function showErrorMessage(args: ShowErrorMessageArgs): void { //, enqueueSnackbarFn, intl
    const customMessage = args?.friendlyMessage || args.technicalMessage;

    // TODO: Implementar exibição de toast
    console.log('friendlyMessage:', customMessage)

    // enqueueSnackbarFn(customMessage || intl.formatMessage({ id: 'anUnexpectedErrorHasOccurredPleaseTryAgain' }), {
    //     variant: 'error',
    //     anchorOrigin: {
    //         horizontal: 'center',
    //         vertical: 'bottom',
    //     },
    // })
    
    if (!args.technicalMessage) return;
    
    console.error(args.technicalMessage);
}

export function showSuccessMessage(args: ShowSuccessMessageArgs): void { // enqueueSnackbarFn, intl
    // TODO: Implementar exibição de toast
    console.log('friendlyMessage:', args?.friendlyMessage)
    // enqueueSnackbarFn(friendlyMessage || intl.formatMessage({ id: 'operationSuccessfullyDone' }), {
    //     variant: 'success',
    //     anchorOrigin: {
    //         horizontal: 'center',
    //         vertical: 'bottom',
    //     },
    // })
}