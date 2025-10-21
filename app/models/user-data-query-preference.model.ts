export interface UserDataQueryPreference {
    id: number;
    userId: number;
    key: string;
    value?: string;
}

export interface SaveUserDataQueryPreferenceRequest {
    userId: number;
    key: string;
    value?: string | null;
}
