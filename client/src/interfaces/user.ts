export interface IUser {
    id      : number,
    username: string,
    age     : number,
    password: string,
    email:    string,
}

export type TUserForm = {
    username: string,
    password: string,
    passwordConfirm: string,
    age: number,
    email: string
}