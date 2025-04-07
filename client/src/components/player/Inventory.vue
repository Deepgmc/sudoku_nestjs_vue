<script setup lang="ts">
import type { IInventory, IPlayer } from '@/interfaces/PlayerInterfaces';
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
    <div class="inventory_container">
        <div class="inventory_item" v-for="(inventoryCell, index) in player.inventory.maxSlots">
            <div v-if="player.inventory.items[index]" class="item_ico" v-html="player.inventory.items[index].item.icon"></div>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/assets/globalVariables.scss' as globals;
.inventory_container{
    display:flex;
    flex-flow: row wrap;
    .inventory_item {
        border: 1px solid darkgrey;
        width: 40px;
        height: 40px;
        margin: 0 1px 0 0;
        padding: 2px 0 0 0;
    }
    .inventory_item:hover{
        border: 1px solid globals.$oliveColor;
        cursor:pointer;
    }
    .item_ico{
        font-size: 2em;
    }
}

</style>