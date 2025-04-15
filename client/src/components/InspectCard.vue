<script setup lang="ts">
import type { PropType } from 'vue';
import InventoryComponent from '@/components/InventoryComponent.vue';
import type PlayerManager from '@/umbrella/PlayerManager';
import type FeatureEntity from '@/umbrella/zoneEntities/FeatureObjects/FeatureEntity';

const props = defineProps({
    player: {
        type: Object as PropType<PlayerManager>,
        required: true
    },
    feature: {
        type: Object as PropType<FeatureEntity>,
        required: true
    },
})
</script>

<template>
    <div>
        <span class="inventory_name">{{ feature.textName }}</span>
        <InventoryComponent :inventory="feature.inventory" :isPlayer="false" :feature="feature"></InventoryComponent>
        <span class="inventory_name">Мои предметы</span>
        <InventoryComponent :inventory="player.inventory" :isPlayer="true"></InventoryComponent>
    </div>
</template>

<style lang="scss" scoped>
.inventory_name{
    font-size: 1.5em;
}
</style>