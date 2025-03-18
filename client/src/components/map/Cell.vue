<script setup lang="ts">
import PlayerComponent from '../PlayerComponent.vue';

const props = defineProps(['cell', 'index', 'lineIndex'])

//console.log(`%c props.cell (${props.lineIndex}-${props.index}):`, 'color:rgb(182, 86, 158);', props.cell)

</script>

<template>
    <div class="cell_item">
        <div class="cell_item-top">
            <div class="cell_item-top_left" :class="props.cell.backgroundClass">
                <PlayerComponent v-if="props.cell.player"></PlayerComponent>
            </div>
            <div class="cell_item-top_right">
                <div v-for="icon in props.cell.infoIcons">
                    <span v-html="icon" class="icons_list_item"></span>
                </div>
                <!-- <div>&#129348;</div>
                <div>&#129365;</div>
                <div v-if="homeCell">&#128726;</div> -->
            </div>
        </div>
        <div class="cell_item-bottom">
            <div class="cell_item-bottom_button" v-for="action in props.cell.actions">{{ action }}</div>
        </div>
    </div>
</template>


<style lang="scss">

</style>