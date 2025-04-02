import type { TActionPayload } from "@/interfaces/MapInterfaces"
import type AreaManager from "./AreaManager"

export interface IChatMessage {
    text: string
}

export default class Chat {

    messages: IChatMessage[]

    constructor(areaManager: AreaManager){
        this.messages = areaManager.store.chatMessages
    }

    addMessage(newMessage?: IChatMessage): Chat {
        if(!newMessage) return this
        this.messages.push(newMessage)
        return this
    }

    plainText(text: string): Chat {
        this.messages.push({text: text})
        return this
    }
}