import { computed, reactive, ref } from 'vue'
import { defineStore  } from 'pinia'
import type { IArea, TClickedCell, TCoords } from '@/interfaces/MapInterfaces'
import type CellEntity from '@/umbrella/zoneEntities/CellObjects/CellEntity'
import { useZoneStore } from './zoneStore'

export const useAreaStore = defineStore('area', () => {

    const area = ref<IArea>({} as IArea)

    const zoneStore = useZoneStore()

    function loadAreaToStore(newArea: IArea) {
        area.value = newArea
    }

    const isStoreLoaded = computed(() => typeof area.value.districts !== 'undefined' && area.value.districts.length > 0)

    const clickedCell = reactive({}) as TClickedCell

    const isCellClicked = computed(() => {
        return clickedCell.cell !== undefined && clickedCell.x !== undefined && clickedCell.y !== undefined
    })

    const removeUnitFromZone = function(unitType: string, coords: TCoords): boolean {
        return zoneStore.removeUnit(unitType, coords)
    }

    function setClickedCell(cell: CellEntity, coords: TCoords) {
        clickedCell.cell = cell
        clickedCell.x = coords.x
        clickedCell.y = coords.y
    }
    function getClickedCell(): TClickedCell {
        return clickedCell
    }

    return {
        area,
        isStoreLoaded,
        loadAreaToStore,
        setClickedCell,
        getClickedCell,

        removeUnitFromZone,

        clickedCell,
        isCellClicked,
    }
})

