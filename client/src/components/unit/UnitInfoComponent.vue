<template>
    <div class="unit-info-component_container">
        <div class="unit_stats">
            <unit-icon size="7em" :icon="unit.icon"></unit-icon>
            <unit-stats-list :unit="unit"></unit-stats-list>
        </div>
        <div class="unit_items">
            <div class="unit_equiped">
                <unit-equiped-component
                    :unit="unit"
                    :isDndAllowed="isDndAllowed"
                >
                </unit-equiped-component>
            </div>
            <div v-if="isInventoryVisible" class="unit_inventory">
                <div v-if="lootInventory">Можно забрать предметы убитого противника:</div>
                <inventory-component :isPlayer="isPlayer" :inventory="thisInventory"></inventory-component>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type PropType, type Ref } from 'vue';
import UnitEquipedComponent from './UnitEquipedComponent.vue';
import InventoryComponent from '@/components/InventoryComponent.vue';
import UnitStatsList from './UnitStatsList.vue';
import UnitIcon from './UnitIcon.vue';
import type Unit from '@/umbrella/zoneEntities/Units/Unit';
import type { IInventory } from '@/interfaces/ItemsInterfaces';

const props = defineProps({
    unit: {
        type: Object as PropType<Unit>,
        required: true
    },
    isDndAllowed: {
        type: Boolean,
        required: false,
        default: true
    },
    isPlayer: {
        type: Boolean,
        required: false,
        default: function(){
            return false
        }
    },
    isInventoryVisible: {
        type: Boolean,
        required: false,
        default: function(){
            return true
        }
    },
    lootInventory: {
        type: Object as PropType<IInventory>,
        required: false
    },
})

let thisInventory: Ref<IInventory>
if(props.lootInventory){
    thisInventory = ref(props.lootInventory)
} else {
    thisInventory = ref(props.unit.inventory)
}


</script>





<style lang="scss">
.unit-info-component_container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .unit_stats, .unit_equiped{
        border-left: 1px solid rgb(82, 82, 82);
        display: flex;
        padding: 7px;
    }
    .unit_stats {
        width:30%;
        flex-flow: column nowrap;
    }
    .unit_items{
        width:70%;
        flex-flow: column nowrap;
        .unit_equiped{
            display: flex;
            flex-flow: row wrap;
            .equiped_item{
                border: 1px solid rgb(88, 74, 33);
                width: 70px;
                height: 70px;
                margin: 2px;
                font-size:0.8em;
                .equiped_item_icon{
                    font-size: 4em;
                    cursor: pointer;
                }
                .equiped_item_icon_empty{
                    font-size: 0.9em;
                }
            }
        }
        .unit_inventory{
            display: flex;
            flex-flow: row wrap;
        }
    }
    .unit_icon{
        font-size: 7em
    }
}
</style>
