export interface AuthRequest{
    username: string;
    password: string;
}

export interface VerificationCodeRequest{
    email: string;
    verificationCode: string;
}