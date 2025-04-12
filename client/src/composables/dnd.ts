import type { IInventoryItem, IItem } from "@/interfaces/ItemsInterfaces"
import Item, { ItemFactory } from "@/umbrella/items/Items"
import PlayerManager from "@/umbrella/PlayerManager"

export function dragItem(event: DragEvent, item: IItem | null){
    if(!event.dataTransfer || item === null) return false
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData('itemId', item.itemId)
    event.dataTransfer.setData('itemNumber', item.itemNumber)

    const eventTarget: any = event.target
    event.dataTransfer.setData('dndFrom', eventTarget.dataset.dnd_entity)
    event.dataTransfer.setData('slotType', item.slotType ? item.slotType : '')

    console.groupCollapsed('Drag Start')
    console.log('%c event:', 'color:rgb(182, 86, 158);', event)
    console.log('%c item:', 'color:rgb(182, 86, 158);', item)
    console.log('%c dataTransfer:', 'color:rgb(182, 86, 158);', event.dataTransfer)
    console.log('%c dndFrom:', 'color:rgb(182, 86, 158);', eventTarget.dataset.dnd_entity)
    console.groupEnd()

    return true
}

export function dropItem(event: DragEvent): boolean{
    if(!event.dataTransfer || !event.target) return false
    const itemId = event.dataTransfer.getData('itemId')
    const itemNumber = event.dataTransfer.getData('itemNumber')
    const dndFrom = event.dataTransfer.getData('dndFrom')
    const iitem: IInventoryItem = {
        item: ItemFactory({name: Item.getRawNameFromId(itemId, itemNumber), quantity: 1}),
        quantity: 1
    }


    const eventTarget: any = event.target
    const dndTo = eventTarget.dataset.dnd_entity

    console.log('%c dndFrom:', 'color:rgb(182, 86, 158);', dndFrom)
    console.log('%c dndTo:', 'color:rgb(182, 86, 158);', dndTo)


    const player = PlayerManager.getInstance()
    // если таргет - слот плэера
    if(dndFrom === 'inventory_item_ico' && dndTo === 'equiped'){
        const slotType = eventTarget.dataset.slot_type
        console.log('%c slotType:', 'color:rgb(182, 86, 158);', slotType)
        if(slotType !== iitem.item.slotType){
            console.log('%c Нельзя одеть в этот слот', 'color:red;')
            return false
        }

        console.log('%c Одеваем предмет в слот ' + slotType, 'color:pink;', iitem)
        player.equipItem(iitem, slotType)
        player.inventory.removeItem(iitem.item.itemId)
    } else if(dndFrom === 'equiped' && dndTo === 'inventory'){
        const slotType = event.dataTransfer.getData('slotType')
        player.unequipItem(slotType)
        player.inventory.addItems([iitem])
    }

    return false
}