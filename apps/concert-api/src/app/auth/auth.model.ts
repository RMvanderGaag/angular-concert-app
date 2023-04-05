export interface UserCredentials {
    email: string;
    password: string;
}

export interface TokenString {
    token: string;
}

export interface UserRegistration extends UserCredentials {
    name: string;
    city: string;
    birthday: Date;
}

export interface ResourceId {
    id: string;
}
