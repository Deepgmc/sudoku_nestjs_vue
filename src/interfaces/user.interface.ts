
export interface IUser {
    userId  : number,
    username: string,
    email   : string,
    age     : number,
    password: string,
    reg_date: Date
}

export type TUserId = IUser['userId'];

export type IUsersCreateDTO = Omit<IUser, 'userId'>
export type IUsersUpdateDTO = Partial<IUser>
export type TUserWithoutPassword = Omit<IUser, 'password'>