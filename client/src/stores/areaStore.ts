import { computed, ref } from 'vue'
import { defineStore  } from 'pinia'
import type { IArea } from '@/interfaces/MapInterfaces'

export const useAreaStore = defineStore('area', () => {

    const area = ref<IArea>({} as IArea)

    function loadAreaToStore(newArea: IArea){
        area.value = newArea
    }

    const isStoreLoaded = computed(() => typeof area.value.districts !== 'undefined' && area.value.districts.length > 0)

    return {
        area,
        isStoreLoaded,
        loadAreaToStore
    }
})

