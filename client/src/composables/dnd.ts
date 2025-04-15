import type { IInventoryItem, TransferObjectWithInventory, IItem } from "@/interfaces/ItemsInterfaces"
import ChatManager from "@/umbrella/ChatManager"
import Item, { ItemFactory } from "@/umbrella/items/Items"
import PlayerManager from "@/umbrella/PlayerManager"
import { ref } from "vue"

//remember the drag object-owner of inventory
const dragObjectFrom = ref<TransferObjectWithInventory | null>(null)

export function dragItem(event: DragEvent, item: IItem | null, dragObjectOwner: TransferObjectWithInventory | undefined){
    if(!event.dataTransfer || item === null) return false
    if(dragObjectOwner !== undefined){
        dragObjectFrom.value = dragObjectOwner
    }
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData('itemId', item.itemId)
    event.dataTransfer.setData('itemNumber', item.itemNumber)

    const eventTarget: any = event.target
    event.dataTransfer.setData('dndFrom', eventTarget.dataset.dnd_entity)
    event.dataTransfer.setData('isPlayerFrom', eventTarget.dataset.is_player)
    event.dataTransfer.setData('slotType', item.slotType ? item.slotType : '')

    return true
}

export function dropItem(event: DragEvent): boolean {
    if(!event.dataTransfer || !event.target) return false
    const itemId = event.dataTransfer.getData('itemId')
    const itemNumber = event.dataTransfer.getData('itemNumber')
    const dndFrom = event.dataTransfer.getData('dndFrom')
    const isPlayerFrom = event.dataTransfer.getData('isPlayerFrom') === 'true'
    const iitem: IInventoryItem = {
        item: ItemFactory({name: Item.getRawNameFromId(itemId, itemNumber), quantity: 1}),
        quantity: 1
    }

    const eventTarget: any = event.target
    const dndTo = eventTarget.dataset.dnd_entity

    console.log('%c dndFrom:', 'color:rgb(182, 86, 158);', dndFrom)
    console.log('%c dndTo:', 'color:rgb(182, 86, 158);', dndTo)

    const player = PlayerManager.getInstance()
    // если таргет - слот плэера, принесли из инвентаря
    if(dndFrom === 'inventory_item_ico' && dndTo === 'equiped'){
        const slotType = eventTarget.dataset.slot_type
        if(slotType !== iitem.item.slotType){
            ChatManager.getInstance().addMessage(ChatManager.getChatMessage('Этот предмет нельзя сюда одеть'))
            throw new Error('Нельзя одеть в этот слот')
            return false
        }
        console.log('%c Одеваем предмет в слот ' + slotType, 'color:pink;', iitem)
        player.equipItem(iitem, slotType)
        player.inventory.removeItem(iitem.item.itemId)
    // если таргет - инвентарь, принесли из слота игрока
    } else if(dndFrom === 'equiped' && dndTo === 'inventory'){
        const slotType = event.dataTransfer.getData('slotType')
        player.unequipItem(slotType)
        player.inventory.addItems([iitem])
    //TODO
    //!сделать проверку на инвентарь игрока, а не любой
    // перетаскиваем из инвентаря в корзину, удаляем предмет
    } else if(dndTo === 'trash' && dndFrom === 'inventory_item_ico'){
        player.inventory.removeItem(iitem.item.itemId)
    // переносим между двух инвентарей
    } else if(dndFrom === 'inventory_item_ico' && dndTo === 'inventory'){
        if(!isPlayerFrom){
            //если предмет переносим В (не из) инвентарь персонажа
            player.inventory.addItems([iitem])
            if(dragObjectFrom.value !== null){
                dragObjectFrom.value.inventory.removeItem(itemId)
            }
        }
    }

    dragObjectFrom.value = null

    return false
}