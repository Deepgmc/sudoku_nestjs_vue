<script setup lang="ts">

const props = defineProps(['clickedCell'])

</script>


<template>
    <div>
        InfoComponent
        {{ clickedCell.cell.objectName }} ({{ clickedCell.x }} - {{ clickedCell.y }})
    </div>
</template>


<style lang="scss">

</style>