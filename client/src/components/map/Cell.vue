<script setup lang="ts">
import { computed, type PropType } from 'vue';
import PlayerComponent from '../PlayerComponent.vue';
import type CellEntity from '@/umbrella/zoneEntities/CellEntity';


const props = defineProps({
    cellIndex: {type: Number, required: true},
    lineIndex: {type: Number, required: true},
    clickedCellX: {type: Number, required: true},
    clickedCellY: {type: Number, required: true},
    cell: {
        type: Object as PropType<CellEntity>,
        required: true
    }
})

const isMeClicked = computed(() => {
    return props.clickedCellY === props.cellIndex && props.clickedCellX === props.lineIndex
})

</script>

<template>
    <div
        class="cell_item"
        :class="{'cell_item-clicked': isMeClicked}"
        @click="$emit('cellClick', lineIndex, cellIndex, props.cell)"
    >
        <div class="cell_item-top">
            <div class="cell_item-top_left" :class="props.cell.backgroundClass">
                <!-- need slot here!!! -->
                <PlayerComponent v-if="props.cell.player"></PlayerComponent>
            </div>
            <div class="cell_item-top_right">
                <div v-for="icon in props.cell.infoIcons">
                    <span v-html="icon" class="icons_list_item"></span>
                </div>
            </div>
        </div>
        <div class="cell_item-bottom">
            <div class="cell_item-bottom_button" v-for="action in props.cell.actions">{{ action }}</div>
        </div>
    </div>
</template>


<style lang="scss">

</style>