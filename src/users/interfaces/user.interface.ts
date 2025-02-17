export interface IUser {
    id  : number,
    name: string,
    age : number
}

export type TUserId = IUser['id']