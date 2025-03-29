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
console.log('%c Button props.action:', 'color:rgb(182, 86, 158);', props.action)
</script>

<template>
    <div class="info_actionButton" @click="$emit('infoActionsClick', props.action)">
        <slot></slot>
    </div>
</template>

<style lang="scss">

</style>