<script setup lang="ts">
import type { PropType } from 'vue';
import ItemTooltip from '@/components/ItemTooltip.vue'
import type { IInventory } from '@/interfaces/ItemsInterfaces'
import { dragItem, dropItem } from '@/composables/dnd'
import type FeatureEntity from '@/umbrella/zoneEntities/FeatureObjects/FeatureEntity';

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
    },
    feature: {
        type: Object as PropType<FeatureEntity>,
        required: false
    },
})
</script>

<template>
    <div class="inventory_container">
        <div class="inventory_item"
            v-for="(_, index) in inventory.maxSlots"
            @drop.stop="dropItem($event)"
            @dragenter.prevent=""
            @dragover.prevent=""
            data-dnd_entity="inventory"
        >
            <div
                v-if="inventory.items[index]"
                class="item_ico"
                draggable="true"
                data-dnd_entity="inventory_item_ico"
                :data-is_player="isPlayer"
                @dragstart="dragItem($event, inventory.items[index].item, feature)"
            >
                <div class="item_quantity_number">{{ inventory.items[index].quantity }}</div>
                <div v-html="inventory.items[index].item.icon"></div>
                <ItemTooltip :item="inventory.items[index].item"></ItemTooltip>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/assets/globalVariables.scss' as globals;
.inventory_container{
    display: flex;
    flex-flow: row wrap;
    border: 1px dashed rgb(54, 54, 54);
    padding: 5px;
    margin: 5px 0 5px 0;
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
        .item_quantity_number{
            position: absolute;
            margin: 30px 0 0 40px;
            font-size:0.3em;
        }
    }
}

</style>