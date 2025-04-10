import { SLOT_TYPES, type IfactoryItemOptions, type IInventoryItem, type IItem, type IRawItem, type TItemId, type TItemNumber } from "@/interfaces/ItemsInterfaces"
import {items} from './ItemsList.ts'

//предметы, необходимые для:
//копания
export const enum itemsNeedToDig {SHOVEL = 'shovel'}

export function ItemFactory(rawItem: IRawItem): IItem {
    const itemId = Item.splitRawName(rawItem.name).itemId
    const itemNumber = Item.splitRawName(rawItem.name).itemNumber

    type itemsKey = keyof typeof items

    const factoryOptions: IfactoryItemOptions = {
        itemId     : itemId,
        itemNumber : itemNumber, // это подтип предмета knife_01 knife_02 - ножи, но разные
        description: '',
        icon       : '',
        textName   : '',
        slotType   : SLOT_TYPES.INV_ONLY,
    }
    factoryOptions.description = items[itemId as itemsKey].description
    factoryOptions.icon = items[itemId as itemsKey].icon
    factoryOptions.textName = items[itemId as itemsKey].textName
    factoryOptions.slotType = items[itemId as itemsKey].slotType
    return new Item(factoryOptions)
}


export default class Item implements IItem {

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
            return {item: ItemFactory(rawItem), quantity: rawItem.quantity}
        })
    }

    public itemId     : TItemId
    public itemNumber : string
    public icon       : string = '&#10067'              //'&#x2753;'         //default icon
    public description: string = 'Default description'
    public textName   : string = 'Text name'
    public slotType   : SLOT_TYPES

    constructor(factoryOptions: IfactoryItemOptions){
        this.itemId      = factoryOptions.itemId
        this.itemNumber  = factoryOptions.itemNumber
        this.description = factoryOptions.description
        this.textName    = factoryOptions.textName
        this.icon        = factoryOptions.icon
        this.slotType    = factoryOptions.slotType
    }

    static generateInventoryItem(itemId: TItemId, itemNumber: TItemNumber): IInventoryItem | null{
        if(typeof items[itemId as keyof typeof items] === 'undefined'){
            return null
        }
        const thisItem = items[itemId as keyof typeof items]
        return {
            item: {
                itemId     : itemId,
                itemNumber : itemNumber,
                icon       : thisItem.icon,
                description: thisItem.description,
                textName   : thisItem.textName,
                slotType   : thisItem.slotType,
            },
            quantity: 1
        }
    }
}