export interface IUser {
    id: number;
    name: string;
    email: string;
    city: string;
    birthday: Date;
    isAdmin: boolean;
}

export interface IRegisterUser extends IUser{
    password: string;
}