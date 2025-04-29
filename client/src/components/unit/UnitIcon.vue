<template>
    <span
        class="unit_icon"
        :style="{ 'font-size': size }"
        v-html="icon"
    >
    </span>
</template>


<script lang="ts" setup>
const props = defineProps({
    size: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    }
})
</script>


<style lang="scss">

</style>