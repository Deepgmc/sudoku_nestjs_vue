<script setup lang="ts">
import type { PropType } from 'vue';
import UnitEquipedComponent from './UnitEquipedComponent.vue';
import UnitStatsList from './UnitStatsList.vue';
import type Unit from '@/umbrella/zoneEntities/Units/Unit';


const props = defineProps({
    unit: {
        type: Object as PropType<Unit>,
        required: true
    },
    isDndAllowed: {
        type: Boolean,
        required: false,
        default: true
    }
})

</script>

<template>
    <div class="unit-info-component_container">
        <div class="unit_stats">
            <span class="unit_icon" v-html="unit.icon"></span>
            <unit-stats-list :unit="unit"></unit-stats-list>
        </div>
        <div class="unit_equiped">
            <unit-equiped-component
                :unit="unit"
                :isDndAllowed="isDndAllowed"
            >
            </unit-equiped-component>
        </div>
    </div>
</template>

<style lang="scss">
.unit-info-component_container{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .unit_stats, .unit_equiped{
        border: 1px solid darkgrey;
        display: flex;
        padding: 2px;
    }
    .unit_stats{
        width:30%;
        flex-flow: column nowrap;
    }
    .unit_equiped{
        width:70%;
        .equiped_item{
            border: 1px solid red;
            width: 70px;
            height: 70px;
            margin: 2px;
            font-size:0.8em;
            .equiped_item_icon{
                font-size: 4em;
                cursor: pointer;
            }
            .equiped_item_icon_empty{
                border: 1px solid green;
            }
        }
    }
    .unit_icon{
        font-size: 3em
    }
}
</style>
