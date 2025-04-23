import type { IItem, TransferObjectWithInventory } from "@/interfaces/ItemsInterfaces"
import ChatManager from '@/umbrella/ChatManager'

export function useItem(event: Event, item: IItem, unit: TransferObjectWithInventory | undefined){
    if(!unit){
        throw new Error('Ошибка использования предмета')
    }
    const chat: ChatManager = ChatManager.getInstance()
    if(!unit.inventory.isPlayer) {
        chat.addMessage(ChatManager.getChatMessage('Это не ваш предмет'))
        throw new Error('Это не ваш предмет')
    }

    console.log('%c Double click item:', 'color:rgb(182, 86, 158);', item)
    item.use(unit)
}