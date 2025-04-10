<script setup lang="ts">
import type PlayerManager from '@/umbrella/PlayerManager';
import type { PropType } from 'vue';
import Inventory from '@/components/player/PlayerInventory.vue';
import Character from '@/components/player/Character.vue';

const props = defineProps({
    player: {
        type: Object as PropType<PlayerManager>,
        required: true
    }
})
</script>


<template>
    <div>
        <Character :player="player"></Character>
        <q-separator class="q-my-md" />
        <Inventory :player="player"></Inventory>
    </div>
</template>


<style lang="scss">

</style>