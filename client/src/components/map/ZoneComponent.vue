<script setup lang="ts">
import { inject, ref, type PropType } from 'vue';
import ZoneManager from '@/umbrella/ZoneManager'
import Cell from './Cell.vue';

import type PlayerManager from '@/umbrella/PlayerManager';
import type CellEntity from '@/umbrella/zoneEntities/CellEntity';
import type { IZone } from '@/interfaces/MapInterfaces';

const props = defineProps({
    handleCellClick: {
        type: Function,
        required: true
    },
    zone: {
        type: Object as PropType<IZone>,
        required: true
    }
})


console.log('%c ZoneComponent got zone (raw):', 'color:darkgreen;', props.zone)

const player = inject ('player') as PlayerManager

const zoneManager = ZoneManager.getInstance(props.zone)
zoneManager.hydrateZoneObjects()
zoneManager.setPlayerToMap(player)

const clickedCellX = ref<number>(NaN)
const clickedCellY = ref<number>(NaN)
function zoneHandleCellClick(x: number, y: number, cell: CellEntity){
    clickedCellX.value = x
    clickedCellY.value = y
    props.handleCellClick(x, y, cell)
}

</script>



<template>
    <div class="zone-cells-container">
        <div v-for="(cells, lineIndex) in zoneManager.store.zone.zoneCells" :key="lineIndex">
            <div class="zone-cell-line">
                <Cell v-for="(cell, index) in cells" :key="index"
                    :cell="cell"
                    :lineIndex="lineIndex"
                    :cellIndex="index"
                    :clickedCellX="clickedCellX"
                    :clickedCellY="clickedCellY"
                    @cell-click="zoneHandleCellClick"
                >
                </Cell>
            </div>
        </div>
    </div>
</template>



<style lang="scss">
@use '@/assets/zoneCellsIcons.scss';
.zone-cell-line{
    display:flex;
    flex: row nowrap;
    justify-content: center;
}
.cell_item {
    height:80px;
    width:80px;
    border: 1px solid grey;
    border-radius: 5px;
    margin: 1px;
    font-size: 10px;

    display: flex;
    flex-flow: column nowrap;
    .cell_item-top {
        height:79%;
        display: flex;
        flex-flow: row nowrap;
        .cell_item-top_left{
            width:79%;
        }
        .cell_item-top_right{
            width:19%;
            display:flex;
            flex-flow: column;
            justify-content: flex-start;
            div {
                margin-top:2px;
            }
        }
    }
    .cell_item-bottom {
        display:flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        height:19%;
        .cell_item-bottom_button:hover {
            cursor:pointer;
            color:darkgreen;
        }
    }
    .palyer{
        font-size:30px;
    }
}
.cell_item-clicked {
    border: 1px dotted rgb(170, 0, 0);
}

.palyer_cell_container{
    margin-top:10px;
    font-size:30px;
}

.icons_list_item{
    font-size: 14px;
    cursor: pointer;
}
</style>