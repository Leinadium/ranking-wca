export interface LoginUrlModel {
    url: string;
}

export interface UserInformationsModel {
    accessToken: string;
    expiresIn: number;
    name: string;
    wcaId: string;
    register: {
        canRegister: boolean;
        stateId: string | null;
        updated: string | null;
    }
}