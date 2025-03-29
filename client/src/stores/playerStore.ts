import { computed, reactive, ref } from 'vue'
import { defineStore  } from 'pinia'
import type { IEquiped, IInventory, TUserId } from '@/interfaces/PlayerInterfaces'

export const usePlayerStore = defineStore('player', () => {

    const userId = ref<TUserId>(0)
    const userName = ref<string>('')
    const equiped = reactive<IEquiped>({} as IEquiped)
    const inventory = reactive<IInventory>({} as IInventory)

    function getUserId(){
        return userId.value
    }
    function setUserId(newId: number){
        userId.value = newId
    }

    const level = ref(0)
    const experience = ref(0)
    const health = ref(0)
    const strength = ref(0)
    const agility = ref(0)
    const intellect = ref(0)

    const districtX = ref(0)
    const districtY = ref(0)
    const zoneX = ref(0)
    const zoneY = ref(0)
    const x = ref(0)
    const y = ref(0)

    const isPlayerLoaded = computed(() => userId.value > 0)

    return {
        userId,
        userName,

        equiped,
        inventory,

        districtX,
        districtY,
        zoneX,
        zoneY,
        x,
        y,

        level,
        experience,
        health,
        strength,
        agility,
        intellect,

        isPlayerLoaded,
        getUserId,
        setUserId,
    }
})