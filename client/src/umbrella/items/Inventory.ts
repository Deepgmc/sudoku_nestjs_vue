import type { IInventoryItem, IItem, rawItem } from "@/interfaces/ItemsInterfaces";
import type { IInventory } from "@/interfaces/PlayerInterfaces";
import { ItemFactory } from "./Items";

export default class Inventory implements IInventory {
    public maxSlots: number = 10
    public items: IInventoryItem[]

    constructor(rawInventory: rawItem[]) {
        this.items = this.hydrateRawInventory(rawInventory)
    }

    private hydrateRawInventory(rawInventory: rawItem[]): IInventoryItem[]{
        return rawInventory.map((rawItem: rawItem) => {
            return {item: ItemFactory(rawItem), quantity: rawItem.quantity}
        })
    }

}