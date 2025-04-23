<script setup lang="ts">
import type PlayerManager from '@/umbrella/PlayerManager';
import type { PropType } from 'vue';

const props = defineProps({
    player: {
        type: Object as PropType<PlayerManager>,
        required: true
    }
})
</script>

<template>
    <div
        class="palyer_cell_container"
        v-html="player.icon"
    ></div>
</template>

<style lang="scss">

</style>