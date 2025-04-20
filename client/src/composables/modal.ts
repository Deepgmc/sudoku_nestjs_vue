import {type Component, ref} from 'vue'
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
    }
}

export const dialogFeature = ref({} as FeatureEntity)
export let currentDialogComponent: Component
export const isWindowCardOpen = ref(false)

export function loadModal(modalName: string, params?: any): void {
    if(modalName === modalComponents.InspectCard.name){
        dialogFeature.value = params.feature
    }
    currentDialogComponent = modalComponents[modalName as keyof typeof modalComponents].component
    isWindowCardOpen.value = true
}