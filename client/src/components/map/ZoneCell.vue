<script setup lang="ts">
import { computed } from 'vue';
import PlayerComponent from '../PlayerComponent.vue';
import HiddenCell from './HiddenCell.vue';
import PlayerManager from '@/umbrella/PlayerManager';


const props = defineProps({
    cellIndex: {type: Number, required: true},
    lineIndex: {type: Number, required: true},
    clickedCell: {
        type: Object,
        required: true
    },
    cell: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['cellClick'])

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
                <PlayerComponent v-if="props.cell.player" :player="PlayerManager.getInstance()"></PlayerComponent>
                <q-tooltip v-if="props.cell.player">
                    Это вы
                </q-tooltip>
                <q-tooltip v-else>
                    {{ props.cell.textName }}
                </q-tooltip>
            </div>
            <div class="cell_item-top_right">
                <div v-for="infoIcon in props.cell.infoIcons" :key="infoIcon.icon">
                    <span v-html="infoIcon.icon" class="icons_list_item"></span>
                    <q-tooltip>
                        {{ infoIcon.description }}
                    </q-tooltip>
                </div>
            </div>
        </div>
        <div class="cell_item-bottom">
            <div v-for="item in props.cell.inventory.items" :key="item.item.itemId">
                <span v-html="item.item.icon" class="icons_list_item"></span>
                <q-tooltip>
                    {{ item.item.textName }}
                </q-tooltip>
            </div>
        </div>
    </div>
</template>


<style lang="scss">

</style>