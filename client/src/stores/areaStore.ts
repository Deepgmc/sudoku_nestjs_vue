import { ref } from 'vue'
import { defineStore  } from 'pinia'
import type { IArea } from '@/interfaces/MapInterfaces'

export const useAreaStore = defineStore('area', () => {

    const area = ref<IArea>({} as IArea)

    function loadAreaToStore(newArea: IArea){
        area.value = newArea
    }

    return {
        area,
        loadAreaToStore
    }
})

