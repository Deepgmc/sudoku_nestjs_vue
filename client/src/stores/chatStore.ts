import { reactive } from 'vue'
import { defineStore  } from 'pinia'

import { type IChatMessage } from '@/interfaces/MapInterfaces'

export const useChatStore = defineStore('chat', () => {

    const chatMessages: IChatMessage[] = reactive([])

    return {
        chatMessages,
    }
})

