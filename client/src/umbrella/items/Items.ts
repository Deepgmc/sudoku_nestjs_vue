import type { IfactoryItemOptions, IInventoryItem, IItem, rawItem, TItemId } from "@/interfaces/ItemsInterfaces"
import {items} from './ItemsList.ts'

export function ItemFactory(rawItem: rawItem): IItem {
    const itemId = Item.splitRawName(rawItem.name).itemId
    const itemNumber = Item.splitRawName(rawItem.name).itemNumber

    type itemsKey = keyof typeof items

    const factoryOptions: IfactoryItemOptions = {
        itemId     : itemId,
        itemNumber : itemNumber, // это подтип предмета knife_01 knife_02 - ножи, но разные
        description: '',
        icon       : '',
        textName   : ''
    }
    factoryOptions.description = items[itemId as itemsKey].description
    factoryOptions.icon = items[itemId as itemsKey].icon
    factoryOptions.textName = items[itemId as itemsKey].textName
    return new Item(factoryOptions)
}


export default class Item implements IItem {

    /** в базе хранится в формате itemName_01, разделяет на части */
    static splitRawName(rawName: string){
        const splitted = rawName.split('_')
        return {itemId: splitted[0], itemNumber: splitted[1]}
    }

    //получает на вход массив "сырых" вещей (хранятся на карте, в сумках юнитов и т.п.) и возвращает созданные сущности-объекты
    static hydrateRawItemsArray(rawItems: rawItem[]): IInventoryItem[]{
        if(!rawItems || !rawItems.length) return []
        return rawItems.map((rawItem: rawItem) => {
            return {item: ItemFactory(rawItem), quantity: rawItem.quantity}
        })
    }

    public itemId     : TItemId
    public itemNumber : string
    public icon       : string = '&#10067'              //'&#x2753;'         //default icon
    public description: string = 'Default description'
    public textName   : string = 'Text name'

    constructor(factoryOptions: IfactoryItemOptions){
        this.itemId      = factoryOptions.itemId
        this.itemNumber  = factoryOptions.itemNumber
        this.description = factoryOptions.description
        this.textName    = factoryOptions.textName
        this.icon        = factoryOptions.icon
    }
}