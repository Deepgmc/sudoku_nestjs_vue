export interface IPlayer {

    //? TODO вынести этот интерфейс в общее пространство с сервером!
    game_settings: IPlayerGameSettings
}

export interface IPlayerGameSettings {
    currentDistrict: string,
    currentZone: string
}
export type TPlayerGameSettingsString = string