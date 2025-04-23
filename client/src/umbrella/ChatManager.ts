import type { IChatMessage } from "@/interfaces/MapInterfaces"
import UmbrellaManager from "./UmbrellaManager"
import { useChatStore } from '@/stores/chatStore'

export default class ChatManager extends UmbrellaManager {

    messages: IChatMessage[]

    store: ReturnType<typeof useChatStore>;

    static instance: ChatManager
    static getInstance(){
        if(ChatManager.instance) return ChatManager.instance
        ChatManager.instance = new ChatManager()
        return ChatManager.instance
    }

    constructor(){
        super()
        this.store = useChatStore()
        this.messages = this.store.getChatMessages
    }

    addMessage(newMessage: IChatMessage): ChatManager {
        if(!newMessage) return this
        this.messages.push(newMessage)
        return this
    }

    plainText(text: string): ChatManager {
        this.messages.push({text: text, timestamp: Date.now()})
        return this
    }

    static getChatMessage(text: string): IChatMessage {
        return {text: text, timestamp: Date.now()}
    }

    static addMessageText(text: string): IChatMessage {
        const chat = ChatManager.getInstance()
        const msg = {text: text, timestamp: Date.now()}
        chat.addMessage(msg)
        return msg
    }
}