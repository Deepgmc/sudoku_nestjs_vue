export interface IInventory {
    maxSlots: number,
    items: IInventoryItem[],
    getItems: () => IInventoryItem[],
    addItems: (items: IInventoryItem[]) => void,
    removeItem: (itemId: TItemId) => boolean,
    hasItem: (itemId: TItemId) => boolean,
    clean: () => void,
    [key: string]: any,
}

export interface IItem {
    itemId     : TItemId,
    itemNumber : string,
    icon       : string,
    description: string,
    textName   : string
    slotType   : SLOT_TYPES
}
export interface IInventoryItem {
    item: IItem,
    quantity: number
}

export const enum SLOT_TYPES {
    HEAD  = 'head',
    BODY  = 'body',
    LEGS  = 'legs',
    RHAND = 'rhand',
    LHAND = 'lhand',

    INV_ONLY = 'inventory'
}

export type TItemId = string
export type TItemNumber = string
export type TItemQuantity = number

//все предметы на сервере ДОЛЖНЫ храниться в таком виде
export interface IRawItem {
    name: string,
    quantity: number
}

//transmission from itemFactory to Item
export interface IfactoryItemOptions {
    itemId     : string,
    itemNumber : string,
    textName   : string,
    slotType   : SLOT_TYPES,
    description: string,
    icon       : string
}

export type TSlotItem = {
    name: string,
    textName: string
}