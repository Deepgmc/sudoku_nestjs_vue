<script setup lang="ts">
import { inject } from 'vue';
import ZoneManager from '@/umbrella/ZoneManager'
import Cell from './Cell.vue';
import {CellEntityFactory} from '@/umbrella/zoneEntities/Factory'
import type { TObjectNames } from '@/umbrella/zoneEntities/zoneEntities';

import type PlayerManager from '@/umbrella/PlayerManager';

const props = defineProps(['zone'])
console.log('%c ZoneComponent got zone (raw):', 'color:darkgreen;', props.zone)

const player = inject ('player') as PlayerManager

const zoneManager = ZoneManager.getInstance(props.zone)
zoneManager.hydrateZoneObjects()
zoneManager.setPlayerToMap(player)



//смена позиции игрока
// setTimeout(() => {
//     player.store.x = 2
//     player.store.y = 2
//     zoneManager.setPlayerToMap(player)
// }, 3000)


//замена ячейки на новую
// setTimeout(() => {
//     const newItem = CellEntityFactory('house' as TObjectNames, {
//         orientation: 's-w',
//         floor: 12,
//         isEntrance: false,
//         actions: ['A1', 'A2']
//     })
//     zoneManager.store.setNewItem(newItem)

// }, 2000)


</script>



<template>
    <div class="zone-cells-container">
        <div v-for="(cells, lineIndex) in zoneManager.store.zone.zoneCells">
            <div class="zone-cell-line">
                <Cell v-for="(cell, index) in cells"
                    :cell="cell"
                    :index="index"
                    :lineIndex="lineIndex">
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
    .cell_item-bottom{
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
.cell_item:hover {
    border: 1px solid red;
}


// .cell-item{
//     height:80px;
//     width:80px;
//     border: 1px solid grey;
//     border-radius: 5px;
//     margin: 1px;
//     font-size: 10px;

//     display: flex;
//     flex-flow: column nowrap;
//     justify-content: flex-end;
//     align-items: flex-end;
// }
// .cell_action_line{
//     display: flex;
//     flex-flow: row wrap;
//     justify-content: flex-end;
//     width: 50%;
//     background: rgb(66, 64, 64);
//     opacity: 0.5;
//     color:white;
// }
// .cell_action_line > div {
//     display:flex;
// }
// .cell_button{
//     padding-left: 2px;
//     padding-right: 2px;
// }
// .palyer{
//     font-size: 30px;
// }

// .cell-item:hover {
//     border: 1px solid red;
// }
</style>