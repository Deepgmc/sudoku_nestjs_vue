<script setup lang="ts">
import type PlayerManager from '@/umbrella/PlayerManager';
import type { PropType } from 'vue';
import InventoryComponent from '@/components/InventoryComponent.vue';
import CharacterComponent from '@/components/unit/UnitInfoComponent.vue';

const props = defineProps({
    player: {
        type: Object as PropType<PlayerManager>,
        required: true
    }
})
</script>


<template>
    <div>
        <CharacterComponent :unit="player"></CharacterComponent>
        <q-separator class="q-my-md" />
        <InventoryComponent :inventory="player.inventory" :isPlayer="true"></InventoryComponent>
    </div>
</template>


<style lang="scss">

</style>