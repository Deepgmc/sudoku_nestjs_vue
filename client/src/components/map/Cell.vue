<script setup lang="ts">
const props = defineProps(['cell', 'index', 'lineIndex'])

const homeCell = props.lineIndex === 7 && props.index === 1



</script>

<template>
    <div class="cell_item">
        <div class="cell_item-top">
            <div class="cell_item-top_left" :class="props.cell.backgroundClass">
                <div v-if="props.cell.player" class="palyer">&#129399</div>
            </div>
            <div class="cell_item-top_right">
                <div>&#129348;</div>
                <div>&#129365;</div>
                <div v-if="homeCell">&#128726;</div>
            </div>
        </div>
        <div class="cell_item-bottom">
            <div class="cell_item-bottom_button" v-for="action in props.cell.actions">{{ action }}</div>
        </div>
    </div>
</template>


<style lang="scss">

</style>