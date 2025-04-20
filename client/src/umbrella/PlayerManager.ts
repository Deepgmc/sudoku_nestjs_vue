import UmbrellaManager from '@/umbrella/UmbrellaManager';
import ZoneManager from './ZoneManager';
import type CellEntity from './zoneEntities/CellObjects/CellEntity';
import Inventory from './items/Inventory';
import Item from './items/Items';

import { usePlayerStore } from '@/stores/playerStore'

import { type IEquiped, type IPlayer, type IPlayerRaw, type IRawEquiped } from '@/interfaces/PlayerInterfaces';
import { SLOT_TYPES, type TSlotItem, type IInventory, type IInventoryItem, type TItemId, type IItem, ITEM_TYPES } from '@/interfaces/ItemsInterfaces';
import type { IActionResult, IChatMessage, TActionPayload } from '@/interfaces/MapInterfaces';

export default class PlayerManager extends UmbrellaManager implements IPlayer {
    static instance: PlayerManager
    static getInstance(){
        if(PlayerManager.instance) return PlayerManager.instance
        PlayerManager.instance = new PlayerManager()
        return PlayerManager.instance
    }
    store: ReturnType<typeof usePlayerStore>;
    public userName: string = ''
    public playerIcon: string = '&#129399'
    public visibilityRange: number = 2
    public moveRange: number = 1
    public equipedSlots: TSlotItem[] = [
        {name: SLOT_TYPES.HEAD, textName: 'Голова'},
        {name: SLOT_TYPES.BODY, textName: 'Тело'},
        {name: SLOT_TYPES.LEGS, textName: 'Ноги'},
        {name: SLOT_TYPES.RHAND, textName: 'Правая рука'},
        {name: SLOT_TYPES.LHAND, textName: 'Левая рука'},
    ]

    private constructor() {
        super()
        this.store = usePlayerStore()
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

        this.districtX = dataRaw.player.districtX
        this.districtY = dataRaw.player.districtY
        this.zoneX = dataRaw.player.zoneX
        this.zoneY = dataRaw.player.zoneY
        this.x = dataRaw.player.x
        this.y = dataRaw.player.y

        this.level = dataRaw.player.level
        this.experience = dataRaw.player.experience
        this.health = dataRaw.player.health
        this.strength = dataRaw.player.strength
        this.agility = dataRaw.player.agility
        this.intellect = dataRaw.player.intellect

        //hydrate equiped items
        {
            this.equiped = this.equipedSlots.reduce<IEquiped>((acc, slot: TSlotItem) => {
                acc[slot.name as keyof IRawEquiped] = null
                return acc
            }, {} as IEquiped)

            //"одеваем" вещи при инициализации
            this.equipedSlots.forEach((slot: TSlotItem) => {
                if(dataRaw.equiped[slot.name as keyof IRawEquiped].quantity > 0){
                    this.equipItem(
                        Item.hydrateRawItem(dataRaw.equiped[slot.name as keyof IRawEquiped]),
                        slot.name
                    )
                }
            })
        }

        //hydrate inventory
        this.inventory = new Inventory(dataRaw.inventory)

        return true
    }

    isHere(x: number, y:number): boolean{
        return this.x === x && this.y === y
    }

    standsIn(cell: CellEntity): boolean {
        return this.isHere(cell.x, cell. y)
    }

    movePlayer(x:number, y: number, cell: CellEntity){
        this.setXY(x, y)
    }

    setXY(x:number, y: number){
        this.x = x
        this.y = y
    }

    handleMapAction(actionPayload: TActionPayload, next: (msg: IChatMessage) => void): void{
        actionPayload.zoneManager = ZoneManager.getInstance()
        actionPayload.player = this
        actionPayload
            .action
            .activate(actionPayload, next)
            .afterAction()
    }

    equipItem(item: IInventoryItem, slotType: SLOT_TYPES): boolean{
        if(!this.isSlotEmpty(slotType)){
            return false
        }
        this.applyItemStats(item.item, 'add')
        this.equiped[slotType as keyof IEquiped] = item.item
        return true
    }

    unequipItem(slotType: string){
        const item = this.equiped[slotType as keyof IEquiped]
        if(item !== null){
            this.applyItemStats(item, 'remove')
        }

        this.equiped[slotType as keyof IEquiped] = null
    }

    isItemEquiped(itemId: TItemId, slotType: SLOT_TYPES){
        const item = this.equiped[slotType as keyof IEquiped]
        if(!item) return false
        return item.itemId === itemId
    }

    isSlotEmpty(slotType: SLOT_TYPES){
        return this.equiped[slotType as keyof IEquiped] === null
    }

    applyItemStats(item: IItem, actionType: string): boolean {
        const itemType = item.getItemType()
        if(itemType === ITEM_TYPES.CLOTHES){
            if(item.intellect) {
                if(actionType === 'add'){
                    this.intellect += item.intellect
                } else {
                    this.intellect -= item.intellect
                }
            }
            if(item.strength) {
                if(actionType === 'add'){
                    this.strength += item.strength
                } else {
                    this.strength -= item.strength
                }
            }
            if(item.agility) {
                if(actionType === 'add'){
                    this.agility += item.agility
                } else {
                    this.agility -= item.agility
                }
            }
        } else {
            return false
        }
        return true
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
    get inventory(): IInventory{
        return this.store.inventory
    }
    set inventory(newInventory: IInventory){
        this.store.inventory = newInventory
    }
    get equiped(){
        return this.store.equiped
    }
    set equiped(newEquiped: IEquiped){
        this.store.equiped = newEquiped
    }
    get level(){return this.store.level}
    set level(newLevel: number){this.store.level = newLevel}
    get experience(){return this.store.experience}
    set experience(newExperience: number){this.store.experience = newExperience}
    get health(){return this.store.health}
    set health(newHealth: number){this.store.health = newHealth}
    get strength(){return this.store.strength}
    set strength(newStrength: number){this.store.strength = newStrength}
    get agility(){return this.store.agility}
    set agility(newAgility: number){this.store.agility = newAgility}
    get intellect(){return this.store.intellect}
    set intellect(newIntellect: number){this.store.intellect = newIntellect}

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