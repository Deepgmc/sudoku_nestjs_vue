import type { IInventory } from "@/interfaces/ItemsInterfaces";
import Inventory from "@/umbrella/items/Inventory";
import { ref, type Ref } from "vue";

const lootInventory = ref<IInventory>()
export function useLootInventory(maxSlots: number): IInventory {
    return lootInventory.value = new Inventory([], false, maxSlots)
}