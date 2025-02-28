export interface LoginUrlViewModel {
    url: string | null;
}

export interface UserInformationsViewModel {
    accessToken: string;
    expirationTime: number;
    name: string;
    wcaId: string;
    customRegistration: {
        canRegister: boolean;
        stateId: string | null;
        updateTimestamp: string | null;
    }
}