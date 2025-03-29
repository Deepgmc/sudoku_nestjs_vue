import type { IfactoryItemOptions, IItem, rawItem, TItemId, TItemQuantity } from "@/interfaces/ItemsInterfaces"

export function ItemFactory(rawItem: rawItem): IItem {
    const factoryOptions: IfactoryItemOptions = {
        itemId     : rawItem.name,
        description: '',
        icon       : ''
    }
    switch(rawItem.name){
        case 'pants':
            factoryOptions.description = 'Штаны'
            factoryOptions.icon = '&#128086' //1F456
        break
        case 'water':
            factoryOptions.description = 'Питьевая вода'
            factoryOptions.icon = '&#127862' //1F376
        break
    }
    return new Item(factoryOptions)
}


export default class Item implements IItem {
    public itemId: TItemId
    public icon: string = '&#10067' //'&#x2753;'         //default icon
    public description: string = 'Default description'

    constructor(factoryOptions: IfactoryItemOptions){
        this.itemId = factoryOptions.itemId
        this.description = factoryOptions.description
        this.icon = factoryOptions.icon
    }
}