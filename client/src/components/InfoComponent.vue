<script setup lang="ts">



const props = defineProps(['clickedCell'])

console.log('%c clickedCell component:', 'color:rgb(182, 86, 158);', props.clickedCell)

</script>


<template><!-- {{ clickedCell.cell.objectName }} ({{ clickedCell.x }} - {{ clickedCell.y }}) -->
    <div>
        <h3>{{ clickedCell.cell.textName }} ({{ clickedCell.cell.objectName }})</h3>
        <hr>
        Description:
        <div>{{ clickedCell.cell.getInfoDescription() }}</div>
        <hr>
        Features:
        <!-- <div>{{ clickedCell.cell.getFeaturesInfo() }}</div> -->
        <hr>
        Actions:
        <!-- <button @click="$emit('actionsClick', {payload: props.clickedCell, action: 'movePlayer'})">Move here</button> -->
    </div>
</template>


<style lang="scss">

</style>