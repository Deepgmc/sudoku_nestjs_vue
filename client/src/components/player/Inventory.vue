<script setup lang="ts">
import type { IInventory } from '@/interfaces/PlayerInterfaces';
import type { PropType } from 'vue';

const props = defineProps({
    inventory: {
        type: Object as PropType<IInventory>,
        required: true
    }
})
</script>

<template>
    <div>
        <div v-for="inventoryItem in inventory.items">
            <div class="item_ico" v-html="inventoryItem.item.icon"></div>
            {{ inventoryItem.item.itemId }} ({{ inventoryItem.quantity }})
        </div>
    </div>
</template>

<style lang="scss">
.item_ico{
    font-size: 4em;
}
.item_ico:hover{
    border: 1px solid red;
}
</style>