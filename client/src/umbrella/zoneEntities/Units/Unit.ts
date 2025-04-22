import { reactive, ref } from "vue";
import { ITEM_TYPES, type IInventory, type IInventoryItem, type IItem, type SLOT_TYPES, type TItemId, type TSlotItem } from "@/interfaces/ItemsInterfaces";
import { equipSlots } from '@/constants';
import type { IEquiped, IRawEquiped } from "@/interfaces/ItemsInterfaces";
import type { infoIconsObject, IUnitRaw, TRawActions } from "@/interfaces/MapInterfaces";
import type MapAction from "@/umbrella/actions/MapAction";
import Item from "@/umbrella/items/Items";


export default abstract class Unit {

    public objectName: string = ''
    constructor(unitRaw?: IUnitRaw){
        if(unitRaw){ //создаём юнита на карте, а не игрока
            this.objectName = unitRaw.name
            this.mapUnitActions = unitRaw.actions
        }

        const equipedObject = equipSlots.reduce<IEquiped>((acc, slot: TSlotItem) => {
            acc[slot.name as keyof IRawEquiped] = null
            return acc
        }, {} as IEquiped)
        this.equiped = reactive(equipedObject)
    }

    abstract textName: string
    abstract chatDescription: string
    abstract defaultActions: TRawActions
    abstract defaultEntityActions: TRawActions

    public mapUnitActions: TRawActions = []
    public generalDefaultActions: TRawActions = []
    public actions: MapAction[] = [] as MapAction[] //собранные с разных источников действия для этого конкретного unit

    public inventory: IInventory = {} as IInventory
    public equiped: IEquiped

    public level = ref(0)
    public experience = ref(0)
    public health = ref(0)
    public strength = ref(0)
    public agility = ref(0)
    public intellect = ref(0)

    equipItems(equipedRaw: IRawEquiped): void{
        //"одеваем" вещи при инициализации
        equipSlots.forEach((slot: TSlotItem) => {
            if(equipedRaw[slot.name as keyof IRawEquiped].quantity > 0){
                this.equipItem(
                    Item.hydrateRawItem(equipedRaw[slot.name as keyof IRawEquiped]),
                    slot.name
                )
            }
        })
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
                    this.intellect.value += item.intellect
                } else {
                    this.intellect.value -= item.intellect
                }
            }
            if(item.strength) {
                if(actionType === 'add'){
                    this.strength.value += item.strength
                } else {
                    this.strength.value -= item.strength
                }
            }
            if(item.agility) {
                if(actionType === 'add'){
                    this.agility.value += item.agility
                } else {
                    this.agility.value -= item.agility
                }
            }
        } else {
            return false
        }
        return true
    }

    abstract getFeatureInfoIcon(): infoIconsObject
}