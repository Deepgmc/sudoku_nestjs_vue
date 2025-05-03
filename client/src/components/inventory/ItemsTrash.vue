<template>
    <div
        v-html="'&#128465;'"
        @drop.stop="dropItem($event)"
        @dragenter.prevent=""
        @dragover.prevent=""
        data-dnd_entity="trash"
    ></div>
</template>

<script lang="ts" setup>
import { dropItem } from '@/composables/dnd'

</script>

<style lang="scss">

</style>