import { ref } from 'vue'
import { defineStore  } from 'pinia'
import type { IPlayer } from '@/interfaces/player'

export const usePlayerStore = defineStore('player', () => {

    const player = ref<IPlayer>({} as IPlayer)

    return {player}
})

