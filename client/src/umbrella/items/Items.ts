import type { IfactoryItemOptions, IInventoryItem, IItem, rawItem, TItemId, TItemQuantity } from "@/interfaces/ItemsInterfaces"

export function ItemFactory(rawItem: rawItem): IItem {
    const itemId = Item.splitRawName(rawItem.name).itemId
    const itemNumber = Item.splitRawName(rawItem.name).itemNumber
    const factoryOptions: IfactoryItemOptions = {
        itemId     : itemId,
        itemNumber : itemNumber,
        description: '',
        icon       : ''
    }
    switch(itemId){
        case 'pants':
            factoryOptions.description = 'Штаны'
            factoryOptions.icon = '&#128086' //1F456
            break
        case 'water':
            factoryOptions.description = 'Питьевая вода'
            factoryOptions.icon = '&#127862' //1F376
            break
        case 'knife':
            factoryOptions.description = 'Нож'
            factoryOptions.icon = '&#128298'
            break
        case 'shirt':
            factoryOptions.description = 'Футболка'
            factoryOptions.icon = '&#128085'
            break
        case 'umbrellaBadge':
            factoryOptions.description = 'Удостоверение сотрудника корпорации Umbrella'
            factoryOptions.icon = '&#128220'
            break
    }
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

    constructor(factoryOptions: IfactoryItemOptions){
        this.itemId      = factoryOptions.itemId
        this.itemNumber  = factoryOptions.itemNumber
        this.description = factoryOptions.description
        this.icon        = factoryOptions.icon
    }
}