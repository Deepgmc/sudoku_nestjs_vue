import {type Component, reactive, ref} from 'vue'
import FightActionComponent from '@/components/fight/FightActionComponent.vue';
import InspectCard from '@/components/InspectCard.vue';
import CharacterCard from '@/components/player/CharacterCard.vue';
import type Unit from '@/umbrella/zoneEntities/Units/Unit';

const modalComponents = {
    CharacterCard: {
        name: 'CharacterCard',
        component: CharacterCard,
    },
    InspectCard: {
        name: 'InspectCard',
        component: InspectCard
    },
    Fight: {
        name: 'Fight',
        component: FightActionComponent
    }
}

//ТУТ Убрана реактивность - поэтому были проблемы с вычислением статов в Unit
export const dialogParams = {
    dialogFeature: {} as Unit,
    isNeedTrash: false
}
export let currentDialogComponent: Component
export const isWindowCardOpen = ref(false)

export function loadModal(modalName: string, params?: any): void {
    if(modalName === modalComponents.InspectCard.name){
        //осматриваем только юнитов, но, возможно, осматривать и инвентарь CellEntity?
        dialogParams.dialogFeature = params.unit
        dialogParams.isNeedTrash = true
    }
    if(modalName === modalComponents.Fight.name){
        //fight
        dialogParams.dialogFeature = params.unit
        dialogParams.isNeedTrash = false
    }
    if(modalName === modalComponents.CharacterCard.name){
        //character
        dialogParams.isNeedTrash = true
    }
    currentDialogComponent = modalComponents[modalName as keyof typeof modalComponents].component
    isWindowCardOpen.value = true
}