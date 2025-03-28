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
    <div>
        <button @click="$emit('infoActionsClick', props.action)">
            <slot></slot>
        </button>
    </div>
</template>

<style lang="scss">

</style>