<script setup lang="ts">
import type { TActionPayload, TClickedCell } from '@/interfaces/MapInterfaces';
import { computed, inject, isProxy, toRaw, type PropType } from 'vue';
import type FeatureEntity from '../zoneEntities/FeatureObjects/FeatureEntity';
import type PlayerManager from '../PlayerManager';
import type MapAction from './MapAction';
import type Unit from '../zoneEntities/Units/Unit';

const emit = defineEmits(['infoActionsClick'])

const player = inject('player') as PlayerManager
const props = defineProps({
    action: {
        type: Object as PropType<MapAction>,
        required: true
    },
    clickedCell: {
        type: Object as PropType<TClickedCell>,
        required: true
    },
    feature: {
        type: Object as PropType<FeatureEntity>,
        required: false
    },
    unit: {
        type: Object as PropType<Unit>,
        required: false
    },
})


//ФОРМИРОВАНИЕ ACTION PAYLOAD
const actionPayload: TActionPayload = {
    clickedCell: props.clickedCell,
    feature: props.feature,
    unit: isProxy(props.unit) ? toRaw(props.unit) : props.unit,
    action: props.action,
}

const isActionActive = computed(() => {
    return props.action.isActionActive(player, props.clickedCell.cell)
})
</script>

<template>
    <div v-if="isActionActive" class="info_actionButton" @click="$emit('infoActionsClick', actionPayload)">
        <div>
            {{ props.action.textName }}
        </div>
    </div>
    <div v-else class="info_actionButton_disabled">
        {{ props.action.textName }}
    </div>
</template>

<style lang="scss"></style>