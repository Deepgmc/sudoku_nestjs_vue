import { computed, reactive, ref } from 'vue'
import { defineStore  } from 'pinia'
import type { IArea, TClickedCell } from '@/interfaces/MapInterfaces'

export const useAreaStore = defineStore('area', () => {

    const area = ref<IArea>({} as IArea)

    function loadAreaToStore(newArea: IArea){
        area.value = newArea
    }

    const isStoreLoaded = computed(() => typeof area.value.districts !== 'undefined' && area.value.districts.length > 0)

    const clickedCell: TClickedCell = reactive({
        cell: undefined,
        x: undefined,
        y: undefined
    })

    const isCellClicked = computed(() => {
        return clickedCell.cell !== undefined && clickedCell.x !== undefined && clickedCell.y !== undefined
    })

    return {
        area,
        isStoreLoaded,
        loadAreaToStore,

        clickedCell,
        isCellClicked
    }
})

