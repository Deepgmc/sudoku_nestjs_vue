import type { IInventoryItem, IItem, rawItem } from "@/interfaces/ItemsInterfaces";
import type { IInventory } from "@/interfaces/PlayerInterfaces";
import Item, { ItemFactory } from "./Items";

export default class Inventory implements IInventory {
    public maxSlots: number = 10
    public items: IInventoryItem[]

    constructor(rawInventory: rawItem[]) {
        this.items = Item.hydrateRawItemsArray(rawInventory)
    }

}