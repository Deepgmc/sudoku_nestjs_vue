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

export interface IRawItem {
    name: string,
    quantity: number
}