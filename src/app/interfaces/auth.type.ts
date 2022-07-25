export interface SignUpRequestType {
    userName: string;
    password: string;
    configPassword: string;
    masterPassword?: string;
    role: string;
}

export interface SignInRequest {
    userName: string;
    password: string;
    role: string;
}