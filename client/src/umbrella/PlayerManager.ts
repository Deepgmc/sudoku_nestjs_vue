import { reactive, watch } from 'vue';
import UmbrellaManager from '@/umbrella/UmbrellaManager';
import Unit from '@/umbrella/zoneEntities/Units/Unit';
import ZoneManager from '@/umbrella/ZoneManager';
import type CellEntity from '@/umbrella/zoneEntities/CellObjects/CellEntity';

import { usePlayerStore } from '@/stores/playerStore'

import { type IPlayer, type IPlayerRaw } from '@/interfaces/PlayerInterfaces';
import type { IActionResult, IChatMessage, TActionPayload, TRawActions } from '@/interfaces/MapInterfaces';
import Inventory from './items/Inventory';



export default class PlayerManager extends Unit implements IPlayer {
    static instance: PlayerManager
    static getInstance(){
        if(PlayerManager.instance) return PlayerManager.instance
        PlayerManager.instance = new PlayerManager()
        return PlayerManager.instance
    }
    public store: ReturnType<typeof usePlayerStore>;
    public userName: string = ''
    public icon: string = '&#129399'
    public visibilityRange: number = 2
    public moveRange: number = 1

    public textName: string = 'Игрок'
    public chatDescription: string = 'Игрок'
    public defaultActions: TRawActions = []
    public defaultEntityActions: TRawActions = []
    public getFeatureInfoIcon = () => {
        return {icon: this.icon, description: this.textName}
    }

    private constructor() {
        super(true)
        this.store = usePlayerStore()
        this._getData = UmbrellaManager.$networkManager.applyNetworkMethod('get', this._apiSection)(UmbrellaManager.$authManager)
    }
    private _getData: (action: string) => any
    private _apiSection: string = 'player'

    API_METHODS = {
        INIT_PLAYER: 'get_player_data'
    }

    async init(){
        const getPlayerResult = await this._getData(this.API_METHODS.INIT_PLAYER)(null)
        if(getPlayerResult.error){
            throw new Error(`Wrong player data from server: ${getPlayerResult.error.message}`)
        }

        this.store.userId = getPlayerResult.data.userId
        this.store.userName = getPlayerResult.data.userName

        if(!this.initPlayer(getPlayerResult.data.game_settings)){
            throw new Error('Invalid player received raw data')
        }
        return this
    }

    initPlayer(dataRaw: IPlayerRaw): boolean {
        if(!dataRaw || !dataRaw.player) return false

        this.districtX = dataRaw.player.districtX
        this.districtY = dataRaw.player.districtY
        this.zoneX     = dataRaw.player.zoneX
        this.zoneY     = dataRaw.player.zoneY
        this.x         = dataRaw.player.x
        this.y         = dataRaw.player.y;

        {//чтоб данные в сторе были видны, потом можно убрать
            watch(this.level, (newVal) => {
                this.store.level = newVal
            })
            watch(this.experience, (newVal) => {
                this.store.experience = newVal
            })
            watch(this.currentHealth, (newVal) => {
                this.store.currentHealth = newVal
            })
            watch(this.maxHealth, (newVal) => {
                this.store.maxHealth = newVal
            })
            watch(this.strength, (newVal) => {
                this.store.strength = newVal
            })
            watch(this.agility, (newVal) => {
                this.store.agility = newVal
            })
            watch(this.intellect, (newVal) => {
                this.store.intellect = newVal
            })
        }

        this.initUnit({
            level: dataRaw.player.level,
            experience: dataRaw.player.experience,
            currentHealth: dataRaw.player.currentHealth,
            maxHealth: dataRaw.player.maxHealth,
            strength: dataRaw.player.strength,
            agility: dataRaw.player.agility,
            intellect: dataRaw.player.intellect,
        })

        this.inventory = reactive(new Inventory(dataRaw.inventory, true))

        this.equipItems(dataRaw.equiped)

        return true
    }

    isHere(x: number, y:number): boolean{
        return this.x === x && this.y === y
    }

    standsIn(cell: CellEntity): boolean {
        return this.isHere(cell.x, cell. y)
    }

    movePlayer(x:number, y: number){
        this.setXY(x, y)
    }

    setXY(x:number, y: number){
        this.x = x
        this.y = y
    }

    handleMapAction(actionPayload: TActionPayload, next: (msg: IChatMessage) => void): void{
        actionPayload.zoneManager = ZoneManager.getInstance()
        actionPayload.player = this
        actionPayload.action.activate(actionPayload, next).then((res: IActionResult | void) => {
            res?.afterAction()
        })
        .catch(e => {
            console.log('%c ERRRR:', 'color:red;', e)
            throw new Error('After action.activate afterAction() error')
        })
    }

    /**
     * Перемещаться можно только на 1 клетку по оси X или Y
     * По диагонали нельзя, следовательно, смещение по одной из координат должно быть 0, а по второй - не больше шага персонажа
     * @param cell ячейка, куда хотим переместиться
     * @returns можно или нет
     */
    canMoveToCell(cell: CellEntity): boolean{
        const distanceX = Math.abs(this.x - cell.x)
        const distanceY = Math.abs(this.y - cell.y)
        return distanceX <= this.moveRange &&
            distanceY <= this.moveRange &&
            (distanceX === 0 || distanceY === 0)
    }

    get userId(){
        return this.store.getUserId()
    }
    set userId(newId: number){
        this.store.setUserId(newId)
    }

    get districtX(){return this.store.districtX}
    set districtX(newDistrictX: number){this.store.districtX = newDistrictX}
    get districtY(){return this.store.districtY}
    set districtY(newDistrictY: number){this.store.districtY = newDistrictY}
    get zoneX(){return this.store.zoneX}
    set zoneX(newZoneX: number){this.store.zoneX = newZoneX}
    get zoneY(){return this.store.zoneY}
    set zoneY(newZoneY: number){this.store.zoneY = newZoneY}
    get x(){return this.store.x}
    set x(newX: number){this.store.x = newX}
    get y(){return this.store.y}
    set y(newY: number){this.store.y = newY}
}