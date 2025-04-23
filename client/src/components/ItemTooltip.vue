<script setup lang="ts">
import type { IItem } from '@/interfaces/ItemsInterfaces';
import type { PropType } from 'vue';


const props = defineProps({
    item: {
        type: Object as PropType<IItem>,
        required: true
    }
})
const slotName = props.item.getSlotName()
</script>

<template>
    <q-tooltip>
        <div>{{ item.textName }}</div>
        <div v-if="slotName">Одевается на {{ slotName }}</div>
        <div v-if="item.isHealing()">Пополнить здоровье: {{ item.hp_regen }}</div>
        <q-separator class="q-my-xs" />
        {{ item.description }}
    </q-tooltip>
</template>

<style lang="scss">

</style>