import { computed, ref } from 'vue'
import { defineStore  } from 'pinia'
import type { IZone } from '@/interfaces/MapInterfaces'

export const useZoneStore = defineStore('zone', () => {

    const zone = ref<IZone>({} as IZone)

    function loadZoneToStore(newZone: IZone){
        zone.value = newZone
    }

    const isStoreLoaded = computed(() => zone.value.zoneCells.length > 0)

    return {
        zone,
        isStoreLoaded,
        loadZoneToStore
    }
})

