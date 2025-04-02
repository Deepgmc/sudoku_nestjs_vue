<script setup lang="ts">
import type { IAction, TActionPayload, TClickedCell } from '@/interfaces/MapInterfaces';
import { inject, type PropType } from 'vue';
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
</script>

<template>
    <div class="info_actionButton" @click="$emit('infoActionsClick', actionPayload)">
        <slot></slot>
    </div>
</template>

<style lang="scss"></style>