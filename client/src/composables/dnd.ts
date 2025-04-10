import type { IItem } from "@/interfaces/ItemsInterfaces"
import Item, { ItemFactory } from "@/umbrella/items/Items"
import PlayerManager from "@/umbrella/PlayerManager"

export function dragItem(event: DragEvent, item: IItem){
    if(!event.dataTransfer) return false
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData('itemId', item.itemId)
    event.dataTransfer.setData('itemNumber', item.itemNumber)

    console.groupCollapsed('Drag Start')
    console.log('%c event:', 'color:rgb(182, 86, 158);', event)
    console.log('%c item:', 'color:rgb(182, 86, 158);', item)
    console.log('%c dataTransfer:', 'color:rgb(182, 86, 158);', event.dataTransfer)
    console.groupEnd()

    return true
}

export function dropItem(event: DragEvent){
    if(!event.dataTransfer || !event.target) return false
    const itemId = event.dataTransfer.getData('itemId')
    const itemNumber = event.dataTransfer.getData('itemNumber')
    const item = ItemFactory({name: Item.getRawNameFromId(itemId, itemNumber), quantity: 1})

    console.log('%c Hydrated item:', 'color:rgb(182, 86, 158);', item)

    const eventTarget: any = event.target
    const slotName = eventTarget.dataset.slotname
    const isCharacterSlot = typeof slotName !== 'undefined'

    console.log('%c slotname:', 'color:rgb(182, 86, 158);', slotName)

    // если таргет - слот плэера
    if(isCharacterSlot && slotName === item.slotType){
        console.log('%c ОДЕВАЕМ ШМОТКУ', 'color:pink;')
        const player = PlayerManager.getInstance()
        player.equipItem({item: item, quantity: 1}, slotName)
        player.inventory.removeItem(item.itemId)
    } else {
        console.log('%c CAN NOT DRAG', 'color:red;')
    }

    return false
}