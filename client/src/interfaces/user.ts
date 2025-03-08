export interface IUser {
    id      : number,
    username: string,
    age     : number,
    password: string,
    email:    string,
}

export interface ILoginUser extends Pick<IUser, 'username' | 'password'> {}


export type TRegisterForm = {
    username       : string,
    email          : string,
    age            : number,
    password       : string,
    passwordConfirm: string,
}

export type TFormValidationFields = {
    field      : string,
    caption    : string,
    placeholder: string,
    type       : string
}