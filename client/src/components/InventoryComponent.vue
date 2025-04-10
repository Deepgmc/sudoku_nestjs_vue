<script setup lang="ts">
import type { PropType } from 'vue';
import ItemTooltip from '@/components/ItemTooltip.vue'
import type { IInventory } from '@/interfaces/ItemsInterfaces'
import { dragItem } from '@/composables/dnd'

const props = defineProps({
    inventory: {
        type: Object as PropType<IInventory>,
        required: true
    },
    isPlayer: {//инвентарь юзера (вкл возможность манипуляций) или нет
        type: Boolean,
        required: false,
        default: function(){
            return false
        }
    }
})
</script>

<template>
    <div class="inventory_container">
        <div class="inventory_item" v-for="(_, index) in inventory.maxSlots">
            <div
                v-if="inventory.items[index]"
                class="item_ico draggable"
                draggable="true"
                @dragstart="dragItem($event, inventory.items[index].item)"
            >
                <span v-html="inventory.items[index].item.icon"></span>
                <ItemTooltip :item="inventory.items[index].item"></ItemTooltip>
            </div>
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
        width: 50px;
        height: 50px;
        margin: 0 1px 0 0;
        padding: 2px 0 0 0;
    }
    .inventory_item:hover{
        border: 1px solid globals.$oliveColor;
        cursor:pointer;
    }
    .item_ico{
        font-size: 2.4em;
    }
}

</style>