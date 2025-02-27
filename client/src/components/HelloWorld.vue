<script setup lang="ts">
import { ref, reactive, computed, watch, provide } from 'vue'

//import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useMouse } from './mouse.ts'

import { useUserStore } from '@/stores/user.ts'

type PropType = {
    msg: string,
    twoValues: { a: number, b: number }
}
const emit = defineEmits(['increment']);//emit('increment')
const props = defineProps<PropType>()
const { x, y } = useMouse()
const twoValuesSumm = computed<number>(() => {
    return props.twoValues.a + props.twoValues.b
})




const userStore = useUserStore()

setTimeout(() => {
    userStore.setUser('updatedName', 'newPassword')
}, 5000)




</script>





<template>

    <div class="red">{{ userStore.user.id }} - {{ userStore.user.username }}</div>

    <button @click="$emit('increment')">Add + 100</button>
    <div>{{ props.twoValues.a }} + {{ props.twoValues.b }} = {{ twoValuesSumm }}</div>

    <div class="greetings">
        <h1 class="green">{{ msg }}</h1>
        <h3>
            You’ve successfully created a project with
            <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
            <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
        </h3>
    </div>
</template>


<style scoped>
.blue {
    color: blue;
    border: 1px solid blue;
}

.red {
    color: red;
    border: 1px solid red;
}
</style>
