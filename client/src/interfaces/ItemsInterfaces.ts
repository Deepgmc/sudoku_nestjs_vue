export interface IInventory {
    maxSlots: number,
    items: IInventoryItem[],
    isPlayer: boolean,
    getItems: () => IInventoryItem[],
    addItems: (items: IInventoryItem[]) => void,
    removeItem: (itemId: TItemId) => boolean,
    hasItem: (itemId: TItemId) => boolean,
    clean: () => void,
    isEmpty: () => boolean,

    [key: string]: any,
}

//any type contains inventory
export interface TransferObjectWithInventory {
    inventory: IInventory,
    [key: string]: any,
}

export interface IItem {
    //generated
    itemId     : TItemId,
    itemNumber : string,
    item_type  : ITEM_TYPES,

    //default from itemsList.ts
    icon       : string,
    description: string,
    textName   : string
    slotType   : SLOT_TYPES

    //clothes
    intellect  : number,
    strength   : number,
    agility    : number,
    add_health : number,

    //food
    hp_regen   : number,

    //weapon
    damage     : number,

    getItemType: () => ITEM_TYPES,
    use: (unit: TransferObjectWithInventory) => any, // запускаем процесс использования предмета
    isHealing: () => boolean, //можно ли использовать предмет, чтобы восстанавливать здоровье
    getSlotName: () => string,
}
export interface IInventoryItem {
    item: IItem,
    quantity: number
}
//transmission from itemFactory to Item
export interface IfactoryItemOptions extends IItem{

}

export const enum SLOT_TYPES {
    HEAD  = 'head',
    BODY  = 'body',
    LEGS  = 'legs',
    RHAND = 'rhand',
    LHAND = 'lhand',

    INV_ONLY = 'inventory'
}
export enum ITEM_TYPES {
    CLOTHES = 'clothes',
    WEAPON  = 'weapon',
    FOOD    = 'food',
}

export type TItemId = string
export type TItemNumber = string
export type TItemQuantity = number

//все предметы на сервере ДОЛЖНЫ храниться в таком виде
export interface IRawItem {
    name: string,
    quantity: number
}

//тип одетой вещи
export type TSlotItem = {
    name: SLOT_TYPES,
    textName: string
}


//EQUIPED
export interface IEquiped {
    head: IItem | null,
    body: IItem | null,
    legs: IItem | null,
    rhand: IItem | null,
    lhand: IItem | null,
}
export interface IRawEquiped {
    head: IRawItem,
    body: IRawItem,
    legs: IRawItem,
    rhand: IRawItem,
    lhand: IRawItem,
}