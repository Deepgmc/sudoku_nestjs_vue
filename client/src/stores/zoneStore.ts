import { computed, ref, type Ref } from 'vue'
import { defineStore  } from 'pinia'
import type { IZoneHydrated, TCoords } from '@/interfaces/MapInterfaces'
import type Unit from '@/umbrella/zoneEntities/Units/Unit'

export const useZoneStore = defineStore('zone', () => {

    const zone = ref<IZoneHydrated>({} as IZoneHydrated)

    function loadZoneToStore(newZone: IZoneHydrated){
        zone.value = newZone
    }

    function getZone() {
        return zone.value
    }

    function getZoneCells(){
        return zone.value.zoneCells
    }

    function removeUnit(unitType: string, coords: TCoords): boolean {
        const unitIndex: number = zone.value.zoneCells[coords.y][coords.x].units.findIndex(unit => {
            return unit.coords.x === coords.x && unit.coords.y === coords.y && unit.objectName === unitType
        })
        if(unitIndex !== -1) {
            zone.value.zoneCells[coords.y][coords.x].units.splice(unitIndex, 1)
            return true
        } else {
            return false
        }
    }

    const isStoreLoaded = computed(() => zone.value.zoneCells.length > 0)

    return {
        zone,
        isStoreLoaded,
        loadZoneToStore,
        getZone,
        getZoneCells,

        removeUnit,
    }
})
