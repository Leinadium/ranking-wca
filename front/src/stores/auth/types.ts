
export interface AuthStore {
    user: any; //TODO: Melhorar tipagem
    loginUrl: string | null;
    isLoading: boolean;
}