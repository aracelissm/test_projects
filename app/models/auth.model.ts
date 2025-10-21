export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginAsUserRequest {
    userId: number;
}

export interface ILoginResponse {
    authToken: string;
}

export interface ILoginUserToFileSyncServiceRequest {
    email: string;
    password: string;
}
