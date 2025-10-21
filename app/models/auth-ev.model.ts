export interface IEmailVerificationRequest {
    tempToken: string;
}

export interface IEmailVerificationResponse {
    email: string;
    isPasswordSet: boolean;
    isEmailVerified: boolean;
}
