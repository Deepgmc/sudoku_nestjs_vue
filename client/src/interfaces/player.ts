export interface IPlayer {
    game_settings: IPlayerGameSettings
}

export interface IPlayerGameSettings {
    currentDistrict: string,
    currentZone: string
}