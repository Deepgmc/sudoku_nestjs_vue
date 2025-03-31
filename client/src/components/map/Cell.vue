<script setup lang="ts">
import { computed, type PropType } from 'vue';
import PlayerComponent from '../PlayerComponent.vue';
import HiddenCell from './HiddenCell.vue';
import type CellEntity from '@/umbrella/zoneEntities/CellObjects/CellEntity';


const props = defineProps({
    cellIndex: {type: Number, required: true},
    lineIndex: {type: Number, required: true},
    clickedCell: {
        type: Object,
        required: true
    },
    cell: {
        type: Object as PropType<CellEntity>,
        required: true
    }
})

const isMeClicked = computed(() => {
    return props.clickedCell.y === props.lineIndex && props.clickedCell.x === props.cellIndex
})


</script>

<template>
    <HiddenCell
        class="cell_item cell_item-not_visible"
        v-if="!props.cell.isVisibleToplayer"
    ></HiddenCell>
    <div
        v-else
        class="cell_item"
        :class="{'cell_item-clicked': isMeClicked}"
        @click="$emit('cellClick', cellIndex, lineIndex, props.cell)"
    >
        <div class="cell_item-top">
            <div class="cell_item-top_left" :class="props.cell.backgroundClass">
                <PlayerComponent v-if="props.cell.player" :player="props.cell.player"></PlayerComponent>
            </div>
            <div class="cell_item-top_right">
                <div v-for="icon in props.cell.infoIcons">
                    <span v-html="icon" class="icons_list_item"></span>
                </div>
            </div>
        </div>
        <div class="cell_item-bottom">
            <div v-for="item in props.cell.inventory.items">
                <span v-html="item.item.icon" class="icons_list_item"></span>
            </div>
        </div>
    </div>
</template>


<style lang="scss">

</style>