import { computed, ref, type Ref } from 'vue'
import { defineStore  } from 'pinia'
import type { IZoneHydrated } from '@/interfaces/MapInterfaces'

export const useZoneStore = defineStore('zone', () => {

    const zone = ref({} as IZoneHydrated)

    function loadZoneToStore(newZone: IZoneHydrated){
        zone.value = newZone
    }

    function getZone() {
        return zone.value
    }

    function getZoneCells(){
        return zone.value.zoneCells
    }

    const isStoreLoaded = computed(() => zone.value.zoneCells.length > 0)

    return {
        zone,
        isStoreLoaded,
        loadZoneToStore,
        getZone,
        getZoneCells,
    }
})

