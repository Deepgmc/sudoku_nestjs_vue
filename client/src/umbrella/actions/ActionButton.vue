<script setup lang="ts">
import type { IAction, TActionPayload } from '@/interfaces/MapInterfaces';
import type { PropType } from 'vue';
import type CellEntity from '../zoneEntities/CellObjects/CellEntity';
import type FeatureEntity from '../zoneEntities/FeatureObjects/FeatureEntity';


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
        type: Object as PropType<CellEntity>,
        required: true
    },
    feature: {
        type: Object as PropType<FeatureEntity>,
        required: false
    },
})
const actionPayload: TActionPayload = {
    type: props.type,
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