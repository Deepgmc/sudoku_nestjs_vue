import {type Component, reactive, ref} from 'vue'
import FightActionComponent from '@/components/FightActionComponent.vue';
import InspectCard from '@/components/InspectCard.vue';
import CharacterCard from '@/components/player/CharacterCard.vue';
import type FeatureEntity from '@/umbrella/zoneEntities/FeatureObjects/FeatureEntity';

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

export const dialogParams = reactive({
    dialogFeature: {} as FeatureEntity,
    isNeedTrash: false
})
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