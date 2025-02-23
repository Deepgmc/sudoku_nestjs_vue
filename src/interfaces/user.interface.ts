export interface IUser {
    id: number,
    name: string,
    age: number,
    password: string
}

export type TUserId = IUser['id'];

export type IUsersCreateDTO = Omit<IUser, 'id'>
export type IUsersUpdateDTO = Partial<IUser>
export type TUserWithoutPassword = Omit<IUser, 'password'>;