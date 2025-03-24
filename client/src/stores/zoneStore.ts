import { computed, ref } from 'vue'
import { defineStore  } from 'pinia'
import type { IZone, IZoneHydrated, THydratedZoneCells } from '@/interfaces/MapInterfaces'
import type CellEntity from '@/umbrella/zoneEntities/CellObjects/CellEntity'

export const useZoneStore = defineStore('zone', () => {

    const zone = ref<IZoneHydrated>({} as IZoneHydrated)

    function loadZoneToStore(newZone: IZoneHydrated){
        zone.value = newZone
    }

    //! возможно удалить потом
    function setNewItem(x: number, y: number, item: CellEntity){
        zone.value.zoneCells[y][x] = item
    }

    const isStoreLoaded = computed(() => zone.value.zoneCells.length > 0)

    return {
        zone,
        isStoreLoaded,
        loadZoneToStore,

        setNewItem
    }
})

