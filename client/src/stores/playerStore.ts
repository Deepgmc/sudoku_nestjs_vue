import { computed, ref } from 'vue'
import { defineStore  } from 'pinia'
import type { TUserId } from '@/interfaces/playerInterfaces'

export const usePlayerStore = defineStore('player', () => {

    const userId = ref<TUserId>(0)
    const districtX = ref<number>(0)
    const districtY = ref<number>(0)
    const zoneX = ref<number>(0)
    const zoneY = ref<number>(0)
    const x = ref<number>(0)
    const y = ref<number>(0)

    function getUserId(){
        return userId.value
    }

    const isPlayerLoaded = computed(() => userId.value > 0)

    return {
        userId,
        districtX,
        districtY,
        zoneX,
        zoneY,
        x,
        y,

        isPlayerLoaded,
        getUserId
    }
})