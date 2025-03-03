export interface IUser {
    id      : number,
    username: string,
    age     : number,
    password: string,
    email:    string,
}

export type TServerError = {field:string, message: string}


export type TRegisterForm = {
    username       : string,
    password       : string,
    passwordConfirm: string,
    age            : number,
    email          : string,
}

export type TFormValidationFields = {
    field      : string,
    caption    : string,
    placeholder: string,
    type       : string
}