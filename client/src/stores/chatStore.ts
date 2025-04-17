import { reactive, computed } from 'vue'
import { defineStore  } from 'pinia'

import { type IChatMessage } from '@/interfaces/MapInterfaces'

export const useChatStore = defineStore('chat', () => {

    const chatMessages: IChatMessage[] = reactive([])

    const getChatMessages = computed(() => {
        return chatMessages
    })

    return {
        chatMessages,
        getChatMessages
    }
})

