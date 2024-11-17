export default class AbortSignalsManager {
    static controllers = new Map<string, AbortController>()

    static abortRequest(key: string, reason: string = 'CANCELLED'): void {
        const controller: AbortController | undefined = this.controllers.get(key);

        if (!controller || controller?.signal?.aborted) return
                
        controller.abort(reason);
    }

    static abortAndGetSignal(key: string): AbortSignal {
        this.abortRequest(key);

        const newController: AbortController = new AbortController();
        this.controllers.set(key, newController);

        return newController.signal;
    }

    static abortAll(): void {
        this.controllers.forEach((controller: AbortController, key: string) => {
            if (!controller.signal.aborted) {
                controller.abort('CANCELLED');
            }
        });

        this.controllers.clear();
    }
}
