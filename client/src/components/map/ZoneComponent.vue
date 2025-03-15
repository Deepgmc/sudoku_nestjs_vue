<script setup lang="ts">
import ZoneManager from '@/umbrella/ZoneManager'
import Cell from './Cell.vue';

const props = defineProps(['zone'])
console.log('%c ZoneComponent got zone:', 'color:darkgreen;', props.zone)

const zoneManager = ZoneManager.getInstance(props.zone)
const zone = zoneManager.hydrateZoneObjects()

</script>



<template>
    <div class="zone-cells-container">
        <div v-for="cells in props.zone.zoneCells">
            <div class="zone-cell-line">
                <Cell class="cell-item" v-for="(cell, index) in cells" :cell="cell">
                    {{ index }}
                </Cell>
            </div>
        </div>
    </div>
</template>



<style lang="scss">
.zone-cell-line{
    display:flex;
    flex: row nowrap;
    justify-content: center;
}
.cell-item{
    height:80px;
    width:80px;
    border: 1px solid rgb(59, 54, 54);
    border-radius: 3px;
    margin: 2px;

    display:flex;
    flex: row nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
}
.cell-item:hover {
    border: 1px inset rgb(49, 58, 48);
    cursor:pointer;
}
</style>