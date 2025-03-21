import { computed, reactive, ref } from 'vue'
import { defineStore  } from 'pinia'
import type { IEquiped, IInventory, IPlayer, TUserId } from '@/interfaces/playerInterfaces'

export const usePlayerStore = defineStore('player', () => {

    const userId = ref<TUserId>(0)
    const userName = ref<string>('')
    const player = reactive<IPlayer>({} as IPlayer)
    const equiped = reactive<IEquiped>({} as IEquiped)
    const inventory = reactive<IInventory>({} as IInventory)

    function getUserId(){
        return userId.value
    }
    function setUserId(newId: number){
        userId.value = newId
    }

    const isPlayerLoaded = computed(() => userId.value > 0)

    return {
        userId,
        userName,

        player,
        equiped,
        inventory,

        isPlayerLoaded,
        getUserId,
        setUserId
    }
})