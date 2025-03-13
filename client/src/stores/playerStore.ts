import { computed, ref } from 'vue'
import { defineStore  } from 'pinia'
import type { IPlayer } from '@/interfaces/playerInterfaces'

export const usePlayerStore = defineStore('player', () => {

    const player = ref<IPlayer>({} as IPlayer)

    function loadPlayerToStore(playerData: IPlayer){
        player.value = playerData
    }

    const isPlayerLoaded = computed(() => typeof player.value.game_settings !== 'undefined')

    return {
        player,
        isPlayerLoaded,
        loadPlayerToStore
    }
})