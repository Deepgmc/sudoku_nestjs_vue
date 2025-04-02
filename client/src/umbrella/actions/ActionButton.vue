<script setup lang="ts">
import type { IAction, TActionPayload, TClickedCell } from '@/interfaces/MapInterfaces';
import { computed, inject, type PropType } from 'vue';
import type FeatureEntity from '../zoneEntities/FeatureObjects/FeatureEntity';
import type PlayerManager from '../PlayerManager';

const player = inject('player') as PlayerManager
const props = defineProps({
    type: {
        type: String,
        required: true
    },
    action: {
        type: Object as PropType<IAction>,
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
})
const actionPayload: TActionPayload = {
    type: props.type,
    player: player,
    clickedCell: props.clickedCell,
    feature: props.feature,
    action: props.action,
}
const isActionActive = computed(() => {
    return props.action.isActionActive(player, props.clickedCell.cell)
})
</script>

<template>
    <div v-if="isActionActive" class="info_actionButton" @click="$emit('infoActionsClick', actionPayload)">
        <div>{{ props.action.textName }}</div>
    </div>
    <div v-else class="info_actionButton_disabled">{{ props.action.textName }}</div>
</template>

<style lang="scss"></style>