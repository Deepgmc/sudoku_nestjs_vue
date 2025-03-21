import UmbrellaManager from '@/umbrella/UmbrellaManager';
import { type IPlayer, type IPlayerRaw } from '@/interfaces/playerInterfaces';

export default class PlayerManager extends UmbrellaManager {
    static instance: PlayerManager
    static getInstance(){
        if(PlayerManager.instance) return PlayerManager.instance
        PlayerManager.instance = new PlayerManager()
        return PlayerManager.instance
    }

    public userName: string = ''

    private constructor() {
        super()
        this._getData = this.networkManager.applyNetworkMethod('get', this._apiSection)(this.authManager)
    }
    private _getData: (action: string) => any
    private _apiSection: string = 'player'

    API_METHODS = {
        INIT_PLAYER: 'get_full'
    }

    async init(){
        const getPlayerResult = await this._getData(this.API_METHODS.INIT_PLAYER)(null)
        if(getPlayerResult.error){
            throw new Error(`Wrong player data from server: ${getPlayerResult.error.message}`)
        }

        this.store.userId = getPlayerResult.data.userId
        this.store.userName = getPlayerResult.data.userName

        //! @ts-expect-error -->> TPlayerStore | TPlayerStore - type is ok
        if(!this.loadPlayerToStore(getPlayerResult.data.game_settings)){
            throw new Error('Invalid player received raw data')
        }
        return this
    }

    loadPlayerToStore(dataRaw: IPlayerRaw): boolean {
        if(!dataRaw || !dataRaw.player) return false

        this.store.player = Object.assign(this.store.player, dataRaw.player)
        this.store.equiped = Object.assign(this.store.equiped, dataRaw.equiped)
        this.store.inventory = Object.assign(this.store.inventory, dataRaw.inventory)

        return true
    }

    get userId(){
        return this.store.getUserId()
    }
    set userId(newId: number){
        this.store.setUserId(newId)
    }

    isHere(x: number, y:number): boolean{
        return this.store.x === x && this.store.y === y
    }
}