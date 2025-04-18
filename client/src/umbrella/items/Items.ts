import { ITEM_TYPES, SLOT_TYPES, type IfactoryItemOptions, type IInventoryItem, type IItem, type IRawItem, type TItemId, type TItemNumber } from "@/interfaces/ItemsInterfaces"
import {items} from './ItemsList.ts'

//предметы, необходимые для:
//копания
export const enum itemsNeedToDig {SHOVEL = 'shovel'}

export function ItemFactory(rawItem: IRawItem): IItem {
    const itemId = Item.splitRawName(rawItem.name).itemId
    const itemNumber = Item.splitRawName(rawItem.name).itemNumber

    const factoryOptions: IfactoryItemOptions = Object.assign({} as IfactoryItemOptions, items[itemId as keyof typeof items])
    factoryOptions.itemId = itemId
    factoryOptions.itemNumber = itemNumber

    // const factoryOptions: IfactoryItemOptions = {
    //     itemId     : itemId,
    //     itemNumber : itemNumber, // это подтип предмета knife_01 knife_02 - ножи, но разные
    //     description: items[itemId as itemsKey].description,
    //     icon       : items[itemId as itemsKey].icon,
    //     textName   : items[itemId as itemsKey].textName,
    //     slotType   : items[itemId as itemsKey].slotType,
    //     add_health : items[itemId as itemsKey].add_health,
    //     intellect  : items[itemId as itemsKey].intellect,
    //     strength   : items[itemId as itemsKey].strength,
    //     agility    : items[itemId as itemsKey].agility,
    //     hp_regen   : items[itemId as itemsKey].hp_regen,
    //     damage     : items[itemId as itemsKey].damage,
    // }
    // factoryOptions.description = items[itemId as itemsKey].description
    // factoryOptions.icon = items[itemId as itemsKey].icon
    // factoryOptions.textName = items[itemId as itemsKey].textName
    // factoryOptions.slotType = items[itemId as itemsKey].slotType

    return new Item(factoryOptions)
}


export default class Item implements IItem {
    //generated
    public itemId     : TItemId
    public itemNumber : string
    public item_type  : ITEM_TYPES

    //default from itemsList.ts
    public icon       : string = '&#10067'              //'&#x2753;'         //default icon
    public description: string = 'Default description'
    public textName   : string = 'Text name'
    public slotType   : SLOT_TYPES

    //clothes
    public intellect  : number
    public strength   : number
    public agility    : number
    public add_health : number

    //food
    public hp_regen   : number

    //weapon
    public damage     : number

    constructor(factoryOptions: IfactoryItemOptions){
        //generated
        this.itemId     = factoryOptions.itemId
        this.itemNumber = factoryOptions.itemNumber

        //default from itemsList.ts
        this.description = factoryOptions.description
        this.textName    = factoryOptions.textName
        this.icon        = factoryOptions.icon
        this.slotType    = factoryOptions.slotType

        //clothes
        this.intellect  = factoryOptions.intellect
        this.strength   = factoryOptions.strength
        this.agility    = factoryOptions.agility
        this.add_health = factoryOptions.add_health

        //food
        this.hp_regen = factoryOptions.hp_regen

        //weapon
        this.damage = factoryOptions.damage

        this.item_type = this.getItemType()
    }

    getItemType(): ITEM_TYPES{
        if(this.intellect || this.strength || this.agility || this.add_health) return ITEM_TYPES.CLOTHES
        else if(this.hp_regen) return ITEM_TYPES.FOOD
        else return ITEM_TYPES.WEAPON
    }

    static generateInventoryItem(itemId: TItemId, itemNumber: TItemNumber): IInventoryItem | null{
        if(typeof items[itemId as keyof typeof items] === 'undefined'){
            return null
        }
        return {
            item: ItemFactory({name: this.getRawNameFromId(itemId, itemNumber), quantity: 1}),
            quantity: 1
        }
    }

    /** в базе хранится в формате itemName_01, разделяет на части */
    static splitRawName(rawName: string){
        const splitted = rawName.split('_')
        return {itemId: splitted[0], itemNumber: splitted[1]}
    }
    static getRawNameFromId(itemId: TItemId, itemNumber: string){
        return `${itemId}_${itemNumber}`
    }

    //получает на вход массив "сырых" вещей (хранятся на карте, в сумках юнитов и т.п.) и возвращает созданные сущности-объекты
    static hydrateRawItemsArray(rawItems: IRawItem[]): IInventoryItem[]{
        if(!rawItems || !rawItems.length) return []
        return rawItems.map((rawItem: IRawItem) => {
            return this.hydrateRawItem(rawItem)
        })
    }
    static hydrateRawItem(rawItem: IRawItem): IInventoryItem{
        return {item: ItemFactory(rawItem), quantity: rawItem.quantity}
    }
}