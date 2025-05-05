import { ref } from "vue"
import type { IInventoryItem, TransferObjectWithInventory, IItem, IInventory } from "@/interfaces/ItemsInterfaces"
import ChatManager from "@/umbrella/ChatManager"
import Item, { ItemFactory } from "@/umbrella/items/Items"
import PlayerManager from "@/umbrella/PlayerManager"

//remember the drag object-owner of inventory
const dragObjectFrom = ref<TransferObjectWithInventory | null>(null)
const dragInventoryFrom = ref<IInventory | null>(null)

export function dragItem(
    event: DragEvent,
    item: IItem | null,
    dragObjectOwner: TransferObjectWithInventory | undefined,
    dragInventoryOwner: IInventory | null
){
    if(!event.dataTransfer || item === null) return false
    if(dragObjectOwner !== undefined){
        dragObjectFrom.value = dragObjectOwner
    }
    if(dragInventoryOwner !== undefined){
        dragInventoryFrom.value = dragInventoryOwner
    }

    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData('itemId', item.itemId)
    event.dataTransfer.setData('itemNumber', item.itemNumber)

    const eventTarget: any = event.target
    event.dataTransfer.setData('dndFrom', eventTarget.dataset.dnd_entity)
    event.dataTransfer.setData('isPlayerFrom', eventTarget.dataset.is_player)
    event.dataTransfer.setData('slotType', item.slotType ? item.slotType : '')
}

export function dropItem(event: DragEvent): boolean {
    if(!event.dataTransfer || !event.target) return false
    const dndFrom = event.dataTransfer.getData('dndFrom')
    const itemId = event.dataTransfer.getData('itemId')
    const itemNumber = event.dataTransfer.getData('itemNumber')
    const isPlayerFrom = event.dataTransfer.getData('isPlayerFrom') === 'true'

    const iitem: IInventoryItem = {
        item: ItemFactory({name: Item.getRawNameFromId(itemId, itemNumber), quantity: 1}),
        quantity: 1
    }

    const eventTarget: any = event.target
    const dndTo = eventTarget.dataset.dnd_entity

    console.log('%c dndFrom - dndTo:', 'color:rgb(182, 86, 158);', dndFrom, dndTo)

    const player = PlayerManager.getInstance()
    // если таргет - слот плэера, принесли из инвентаря
    if(dndFrom === 'inventory_item_ico' && dndTo === 'equiped'){
        const slotType = eventTarget.dataset.slot_type
        if(slotType !== iitem.item.slotType){
            ChatManager.addMessageText('Этот предмет нельзя сюда одеть')
            throw new Error('Нельзя одеть в этот слот')
        }
        console.log('%c Одеваем предмет в слот ' + slotType, 'color:pink;', iitem)
        player.equipItem(iitem, slotType)
        player.inventory.removeItem(iitem.item.itemId)
    // если таргет - инвентарь, принесли из слота игрока
    } else if(dndFrom === 'equiped' && dndTo === 'inventory'){
        player.unequipItem(event.dataTransfer.getData('slotType'))
        player.inventory.addItems([iitem])
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
            if(dragInventoryFrom.value !== null){
                dragInventoryFrom.value.removeItem(itemId)
            }
        }
    }

    dragObjectFrom.value = null

    return false
}