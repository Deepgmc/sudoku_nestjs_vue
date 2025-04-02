import type { IfactoryItemOptions, IInventoryItem, IItem, rawItem, TItemId } from "@/interfaces/ItemsInterfaces"
import {items} from './ItemsList.ts'

export function ItemFactory(rawItem: rawItem): IItem {
    const itemId = Item.splitRawName(rawItem.name).itemId
    const itemNumber = Item.splitRawName(rawItem.name).itemNumber

    type itemsKey = keyof typeof items

    const factoryOptions: IfactoryItemOptions = {
        itemId     : itemId,
        itemNumber : itemNumber,
        description: '',
        icon       : '',
        textName   : ''
    }
    factoryOptions.description = items[itemId as itemsKey].description
    factoryOptions.icon = items[itemId as itemsKey].icon
    factoryOptions.textName = items[itemId as itemsKey].textName
    // switch(itemId){
    //     case 'pants':
    //         factoryOptions.description = items[itemId].description
    //         factoryOptions.icon = '&#128086' //1F456
    //         factoryOptions.textName = 'Штаны'
    //         break
    //     case 'water':
    //         factoryOptions.description = 'Питьевая вода'
    //         factoryOptions.icon = '&#127862' //1F376
    //         factoryOptions.textName = 'Вода'
    //         break
    //     case 'knife':
    //         factoryOptions.description = 'Нож'
    //         factoryOptions.icon = '&#128298'
    //         factoryOptions.textName = 'Нож'
    //         break
    //     case 'shirt':
    //         factoryOptions.description = 'Грязная футболка'
    //         factoryOptions.icon = '&#128085'
    //         factoryOptions.textName = 'Футболка'
    //         break
    //     case 'umbrellaBadge':
    //         factoryOptions.description = 'Удостоверение сотрудника корпорации Umbrella'
    //         factoryOptions.icon = '&#128220'
    //         factoryOptions.textName = 'Удостоверение'
    //         break
    // }
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