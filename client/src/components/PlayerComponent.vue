<script setup lang="ts">
import type { IPlayer } from '@/interfaces/PlayerInterfaces';
import type { PropType } from 'vue';

const props = defineProps({
    player: {
        type: Object as PropType<IPlayer>,
        required: true
    }
})
</script>

<template>
    <div
        class="palyer_cell_container"
        v-html="player.playerIcon"
    ></div>
</template>

<style lang="scss">

</style>