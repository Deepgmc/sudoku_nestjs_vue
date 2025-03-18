export interface IPlayer {
    userId: TUserId,
    //? TODO вынести этот интерфейс в общее пространство с сервером!
    game_settings: IPlayerGameSettings
}
export type TUserId = number

export interface IPlayerGameSettings {
    currentDistrict: string,
    currentZone: string,
    x: string,
    y: string
}