export interface IUser {
    userId: number,
    username: string,
    age: number,
    password: string
}

export type TUserId = IUser['userId'];

export type IUsersCreateDTO = Omit<IUser, 'userId'>
export type IUsersUpdateDTO = Partial<IUser>
export type TUserWithoutPassword = Omit<IUser, 'password'>;