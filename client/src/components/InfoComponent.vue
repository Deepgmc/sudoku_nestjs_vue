<script setup lang="ts">
import { defineEmits } from 'vue'
import ActionButton from '@/umbrella/actions/ActionButton.vue';
import type MapAction from '@/umbrella/actions/MapAction';



const props = defineProps(['clickedCell'])
console.log('%c clickedCell component:', 'color:rgb(182, 86, 158);', props.clickedCell)


const emit = defineEmits(['infoActionsClick'])
const handleInfoActions = (action: MapAction) => {
    //прокидываем событие выше
    emit('infoActionsClick', action)
}
const clickedCellFeatures = props.clickedCell.cell.features
</script>


<template>
    <div>
        <h1>{{ clickedCell.cell.textName }} ({{ clickedCell.cell.mapCellObjectName }})</h1>
        <hr>
        Description:
        <div>{{ clickedCell.cell.getInfoDescription() }}</div>
        <hr>
        Features:
        <div class="info_feature-item" v-for="feature in props.clickedCell.cell.features" :key="feature.objectName">
            {{ feature.textName }}
            <ActionButton
                v-for="action in feature.actions"
                :action="action"
                :clickedCell="clickedCell"
                @info-actions-click="handleInfoActions"
            >{{action.textName}}</ActionButton>
        </div>
        <hr>
        Actions:
        <ActionButton
            v-for="action in props.clickedCell.cell.actions"
            :action="action"
            :clickedCell="clickedCell"
            @info-actions-click="handleInfoActions"
        >{{action.textName}}</ActionButton>


    </div>
</template>


<style lang="scss">
.info_feature-item{
    display: flex;
}
</style>