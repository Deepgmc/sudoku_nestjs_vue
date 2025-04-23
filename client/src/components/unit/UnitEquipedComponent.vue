<template>
    <div class="equiped_item"
        :draggable="isDndAllowed"
        data-dnd_entity="equiped"
        @drop.stop="dropItem($event)"
        @dragenter.prevent=""
        @dragover.prevent=""
        @dragstart="dragItem($event, unit.equiped[slot.name as keyof IEquiped], unit)"

        v-for="slot in equipSlots"
        :key="slot.name"
        :data-slot_type="slot.name"
    >
        <div v-if="unit.equiped[slot.name as keyof IEquiped]">
            <span class="equiped_item_icon" v-html="unit.equiped[slot.name as keyof IEquiped]?.icon"></span>
            <ItemTooltip :item="(unit.equiped[slot.name as keyof IEquiped] as IItem)"></ItemTooltip>
        </div>
        <div v-else class="equiped_item_icon_empty">{{ slot.textName }}</div>
    </div>
</template>


<script setup lang="ts">
import type { PropType } from 'vue';
import ItemTooltip from '@/components/ItemTooltip.vue'
import type Unit from '@/umbrella/zoneEntities/Units/Unit';
import { dragItem, dropItem } from '@/composables/dnd';
import { equipSlots } from '@/constants';
import type { IEquiped, IItem } from '@/interfaces/ItemsInterfaces';

const props = defineProps({
    unit: {
        type: Object as PropType<Unit>,
        required: true
    },
    isDndAllowed: {
        type: Boolean,
        required: true
    }
})
</script>


<style lang="scss">

</style>