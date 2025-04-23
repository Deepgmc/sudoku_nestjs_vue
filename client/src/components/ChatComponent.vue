<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type Chat from '@/umbrella/ChatManager';
import type { IChatMessage, IChatMessageTransformed } from '@/interfaces/MapInterfaces';

const props = defineProps({
    chat: {
        type: Object as PropType<Chat>,
        required: true
    },
})

const transformedMessages = computed(() => {
    return props.chat.messages.map((msg: IChatMessage) => {
        const msgDate = new Date(msg.timestamp)
        const transformedMsg: IChatMessageTransformed = {
            ...msg,
            timeString: `${msgDate.getMinutes()}:${msgDate.getSeconds()}`
        }
        return transformedMsg

    })
})
</script>

<template>
    <div>
        <div class="chat_top_block">
            <div v-for="(message, index) in transformedMessages" :key="index">
                <div class="chat_message_block">
                    <div class="chat_message_who">
                        <span>&#129399;</span>
                    </div>
                    <div class="chat_message_text">
                        {{ message.timeString }}:
                        <span v-html="message.text"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="chat_bottom_block">
            Нижний блок чата
        </div>
    </div>
</template>

<style lang="scss">
.chat_top_block{
    overflow-y: scroll;
    height: 210px;
    width:100%;
    display:flex;
    border-bottom: 2px solid olive;
    flex-flow: column nowrap;
}
.chat_bottom_block{
    height: 90px;
}
.chat_message_block {
    display: flex;
    flex-flow: row nowrap;
    font-size:12px;
    .chat_message_who{
        width:9%;
    }
    .chat_message_text{
        width:90%;
    }
}
</style>