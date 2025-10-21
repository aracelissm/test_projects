export interface IResetPasswordRequest {
    tempToken: string;
    password: string;
    confirmPassword: string;
}

export interface IResetPasswordResponse {
    email: string;
}
