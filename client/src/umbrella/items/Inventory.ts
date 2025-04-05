import type { IInventoryItem, rawItem, TItemId } from "@/interfaces/ItemsInterfaces";
import type { IInventory } from "@/interfaces/PlayerInterfaces";
import Item from "./Items";

export default class Inventory implements IInventory {
    public maxSlots: number = 16
    public items: IInventoryItem[]

    constructor(
        rawInventory: rawItem[],
        maxSlots?: number
    ) {
        this.items = Item.hydrateRawItemsArray(rawInventory)
        if(maxSlots) this.maxSlots = maxSlots
    }

    /**
     * перемещает в инвентарь все предметы из указанного инвентаря
        RobAction, PickUpAction
     */
    transferItemsFrom(targetInventory: IInventory): IInventory {
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

    public addItems(newItems: IInventoryItem[]){
        this.items = this.items.concat(newItems)
    }

    public clean(){
        this.items = []
    }

    public isEmpty(){
        return this.items.length < 1
    }

    /** есть ли предмет с itemId в инвенторе */
    hasItem(itemId: TItemId){
        return this.items.find(item => {
            return item.item.itemId === itemId
        })
    }
}