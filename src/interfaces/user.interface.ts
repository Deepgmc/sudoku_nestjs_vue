import type { IPlayerSettings, TEntityPlayerSettings } from './player.interface'

export interface IUser {
    userId         : number,
    username       : string,
    email          : string,
    age            : number,
    password       : string,
    reg_date       : Date,
    game_settings: IPlayerSettings
}

export interface IUserEntity extends Omit<IUser, 'game_settings'> {
    game_settings: TEntityPlayerSettings
}

export type TUserId = IUser['userId'];

export type IUsersCreateDTO = Omit<IUserEntity, 'userId'>
export type IUsersUpdateDTO = Partial<IUserEntity>
export type TUserWithoutPassword = Omit<IUser, 'password'>