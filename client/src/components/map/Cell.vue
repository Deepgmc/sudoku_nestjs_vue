<script setup lang="ts">
const props = defineProps(['cell'])
</script>

<template>
    <div :class="props.cell.backgroundClass">
    </div>
</template>


<style lang="scss">

</style>