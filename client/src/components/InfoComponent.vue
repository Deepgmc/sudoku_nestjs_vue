<script setup lang="ts">
import { defineEmits, type PropType } from 'vue'
import ActionButton from '@/umbrella/actions/ActionButton.vue';
import type { TActionPayload, TClickedCell } from '@/interfaces/MapInterfaces';



const props = defineProps({
    clickedCell: {
        type: Object as PropType<TClickedCell>,
        required: true
    },
})
console.log('%c clickedCell component:', 'color:rgb(182, 86, 158);', props.clickedCell)


const emit = defineEmits(['infoActionsClick'])
const handleInfoActions = (actionPayload: TActionPayload) => {
    //прокидываем событие выше
    emit('infoActionsClick', actionPayload)
}

</script>


<template>
    <div class="infoComponent_container">
        <h5>{{ clickedCell.cell.textName }}</h5>
        <hr>
        <div>{{ clickedCell.cell.getInfoDescription() }}</div>
        <hr>
        <span v-if="props.clickedCell.cell.inventory.items.length">На земле валяется:</span>
        <span v-else>На земле нет ничего примечательного</span>
        <div v-for="item in props.clickedCell.cell.inventory.items">
            <div class="ground_item_icon" v-html="item.item.icon"></div>
            <div class="ground_item_description">{{ item.item.description }}</div>
        </div>
        <hr>

        <template v-if="props.clickedCell.cell.features.length > 0">
            Features:
            <div class="info_feature-item" v-for="feature in props.clickedCell.cell.features" :key="feature.objectName">
                <span class="info_feature-item_icon" v-html="feature.getFeatureInfoIcon().icon"></span>
                {{ feature.textName }}
                Feature actions:
                <ActionButton
                    v-for="action in feature.actions"
                    :action="action"
                    :clickedCell="clickedCell"
                    type="featureAction"
                    :feature="feature"
                    @info-actions-click="handleInfoActions"
                ></ActionButton>
            </div>
        </template>
        Cell entity actions:
        <ActionButton
            v-for="action in props.clickedCell.cell.actions"
            :action="action"
            :clickedCell="clickedCell"
            type="mapAction"
            @info-actions-click="handleInfoActions"
        ></ActionButton>


    </div>
</template>


<style lang="scss">
.infoComponent_container{
    display: flex;
    flex-flow: column nowrap;
}
.info_feature-item{
    display: flex;
    flex-flow: column wrap;
    .info_feature-item_icon{
        font-size: 5em;
    }
}
.ground_item_icon{
    font-size: 3em;
}
</style>