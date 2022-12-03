export interface AuthRequest{
    username: string;
    password: string;
}

export interface VerificationCodeRequest{
    email: string;
    code: string;
}

export interface ChangePassword{
    email: string;
    newPassword: string;
}