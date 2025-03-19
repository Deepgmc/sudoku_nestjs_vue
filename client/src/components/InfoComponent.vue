<script setup lang="ts">
import { onBeforeMount } from 'vue';


const props = defineProps(['clickedCell'])

onBeforeMount(() => {

})
console.log('%c clickedCell:', 'color:rgb(182, 86, 158);', props.clickedCell)

</script>


<template><!-- {{ clickedCell.cell.objectName }} ({{ clickedCell.x }} - {{ clickedCell.y }}) -->
    <div>
        <h3>{{ clickedCell.cell.textName }}</h3>
        <div>{{ clickedCell.cell.getInfoDescription() }}</div>
        <hr>
        <div>{{ clickedCell.cell.getFeaturesInfo() }}</div>
    </div>
</template>


<style lang="scss">

</style>