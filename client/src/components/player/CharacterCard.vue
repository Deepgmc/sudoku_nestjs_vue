<script setup lang="ts">
import type PlayerManager from '@/umbrella/PlayerManager';
import type { PropType } from 'vue';
import InventoryComponent from '@/components/InventoryComponent.vue';
import UnitInfoComponent from '@/components/unit/UnitInfoComponent.vue';

const props = defineProps({
    player: {
        type: Object as PropType<PlayerManager>,
        required: true
    }
})
</script>


<template>
    <div>
        <unit-info-component
            :unit="player"
            :isDndAllowed="true"
            :isPlayer="true"
            :isInventoryVisible="true"
        ></unit-info-component>
        <q-separator class="q-my-md" />
    </div>
</template>


<style lang="scss">

</style>