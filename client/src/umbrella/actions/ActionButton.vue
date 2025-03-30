<script setup lang="ts">

const props = defineProps({
    action: {
        type: Object,
        required: true
    },
    clickedCell: {
        type: Object,
        required: true
    },
})
</script>

<template>
    <div class="info_actionButton" @click="$emit('infoActionsClick', props.action)">
        <slot></slot>
    </div>
</template>

<style lang="scss">

</style>