import UmbrellaManager from '@/umbrella/UmbrellaManager';
import { type IPlayer } from '@/interfaces/playerInterfaces';

export default class PlayerManager extends UmbrellaManager {
    static instance: PlayerManager
    static getInstance(){
        if(PlayerManager.instance) return PlayerManager.instance
        PlayerManager.instance = new PlayerManager()
        return PlayerManager.instance
    }

    private constructor() {
        super()
        this._getData = this.networkManager.applyNetworkMethod('get', this._apiSection)(this.authManager)
    }
    private _getData: (action: string) => any
    private _apiSection: string = 'player'
    private playerRaw: IPlayer = {} as IPlayer

    get userId(){
        return this.store.getUserId()
    }

    API_METHODS = {
        INIT_PLAYER: 'get_full'
    }

    async init(){
        const getPlayerResult = await this._getData(this.API_METHODS.INIT_PLAYER)(null)
        this.playerRaw = getPlayerResult.data as IPlayer
        //! @ts-expect-error -->> TPlayerStore | TPlayerStore - type is ok
        this.loadPlayerToStore(this.playerRaw)
        return this
    }

    loadPlayerToStore(player: IPlayer){
        this.store.userId = player.userId
        const districtCoordinates = this.getXYFromRawSettings(player.game_settings.currentDistrict)
        const zoneCoordinates = this.getXYFromRawSettings(player.game_settings.currentZone)

        this.store.districtX = parseInt(districtCoordinates.x)
        this.store.districtY = parseInt(districtCoordinates.y)
        this.store.zoneX = parseInt(zoneCoordinates.x)
        this.store.zoneY = parseInt(zoneCoordinates.y)
        this.store.x = parseInt(player.game_settings.x)
        this.store.y = parseInt(player.game_settings.y)
    }

    getXYFromRawSettings(rawSettingsXY: string){
        const xy = rawSettingsXY.split('_')
        return {
            x: xy[0],
            y: xy[1]
        }
    }

    isHere(x: number, y:number): boolean{
        return this.store.x === x && this.store.y === y
    }
}