export interface IItem {
    itemId     : TItemId,
    itemNumber : string,
    icon       : string,
    description: string,
    textName   : string
}
export interface IInventoryItem {
    item: IItem,
    quantity: number
}

export type TItemId = string
export type TItemQuantity = number

//все предметы на сервере ДОЛЖНЫ храниться в таком виде
export interface rawItem {
    name: string,
    quantity: number
}

//transmission from itemFactory to Item
export interface IfactoryItemOptions {
    itemId     : string,
    textName   : string,
    itemNumber : string,
    description: string,
    icon       : string
}