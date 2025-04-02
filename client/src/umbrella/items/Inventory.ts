import type { IInventoryItem, rawItem } from "@/interfaces/ItemsInterfaces";
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

    public addItems(newItems: IInventoryItem[]){
        this.items = this.items.concat(newItems)
    }

    public clean(){
        this.items = []
    }
}