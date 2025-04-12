import type { IInventoryItem, IRawItem, TItemId, IInventory } from "@/interfaces/ItemsInterfaces";
import Item from "./Items";

export default class Inventory implements IInventory {
    public maxSlots: number = 16
    public items: IInventoryItem[]

    constructor(
        rawInventory: IRawItem[],
        maxSlots?: number
    ) {
        this.items = Item.hydrateRawItemsArray(rawInventory)
        if(maxSlots) this.maxSlots = maxSlots
    }

    /**
     * перемещает в инвентарь все предметы из указанного инвентаря
        RobAction, PickUpAction etc.
     */
    transferItemsFrom(targetInventory: IInventory): Inventory {
        this.addItems(targetInventory.getItems())
        targetInventory.clean()
        return this
    }

    public getItems(): IInventoryItem[]{
        return this.items
    }

    public getItemsForChat(): string {
        const itemsText: string[] = []
        this.getItems().forEach((item: IInventoryItem) => {
            itemsText.push(`${item.item.textName} (${item.item.icon})`)
        })
        return itemsText.join(', ')
    }

    /**
     * Добавляет предметы в этот инвентарь. Мержит quantity если предмет уже есть
     * @param newItems Добавляемые предметы в формате InventoryItem
     */
    public addItems(newItems: IInventoryItem[]){
        newItems.forEach(newItem => {
            let isFoundThisItem = false
            this.items.forEach(item => {
                if(item.item.itemId === newItem.item.itemId){
                    isFoundThisItem = true
                    item.quantity += newItem.quantity
                }
            })
            if(!isFoundThisItem){
                this.items.push(newItem)
            }
        })
    }

    /** удалить предмет с itemId из инвентаря */
    removeItem(itemId: TItemId){
        const itemIndex = this.items.findIndex(item => {
            return item.item && item.item.itemId === itemId
        })
        this.items[itemIndex].quantity -= 1
        if(this.items[itemIndex].quantity < 1){
            this.items.splice(itemIndex, 1)
        }
        return true
    }

    public clean(): void{
        this.items = []
    }

    public isEmpty(): boolean{
        return this.items.length < 1
    }

    /** есть ли предмет с itemId в инвенторе */
    hasItem(itemId: TItemId): boolean{
        return !!this.items.find(item => {
            return item.item.itemId === itemId
        })
    }

}