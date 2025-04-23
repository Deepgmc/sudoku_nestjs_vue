import { computed, ref } from 'vue'
import { defineStore  } from 'pinia'
import type { TUserId } from '@/interfaces/PlayerInterfaces'

export const usePlayerStore = defineStore('player', () => {

    const userId = ref<TUserId>(0)
    const userName = ref<string>('')

    function getUserId(){
        return userId.value
    }
    function setUserId(newId: number){
        userId.value = newId
    }

    const districtX = ref(0)
    const districtY = ref(0)
    const zoneX = ref(0)
    const zoneY = ref(0)
    const x = ref(0)
    const y = ref(0)

    const level = ref(0)
    const experience = ref(0)
    const currentHealth = ref(0)
    const maxHealth = ref(0)
    const strength = ref(0)
    const agility = ref(0)
    const intellect = ref(0)

    const isPlayerLoaded = computed(() => userId.value > 0)

    return {
        userId,
        userName,

        districtX,
        districtY,
        zoneX,
        zoneY,
        x,
        y,

        level,
        experience,
        currentHealth,
        maxHealth,
        strength,
        agility,
        intellect,

        isPlayerLoaded,
        getUserId,
        setUserId,
    }
})