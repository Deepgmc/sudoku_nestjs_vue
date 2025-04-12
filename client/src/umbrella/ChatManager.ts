import type { IChatMessage } from "@/interfaces/MapInterfaces"
import UmbrellaManager from "./UmbrellaManager"

export default class ChatManager extends UmbrellaManager {

    messages: IChatMessage[]

    static instance: ChatManager
    static getInstance(){
        if(ChatManager.instance) return ChatManager.instance
        ChatManager.instance = new ChatManager()
        return ChatManager.instance
    }

    constructor(){
        super()
        this.messages = this.store.chatMessages
    }

    addMessage(newMessage?: IChatMessage): ChatManager {
        if(!newMessage) return this
        this.messages.push(newMessage)
        return this
    }

    plainText(text: string): ChatManager {
        this.messages.push({text: text})
        return this
    }

    static getChatMessage(text: string): IChatMessage {
        return {text: text}
    }
}