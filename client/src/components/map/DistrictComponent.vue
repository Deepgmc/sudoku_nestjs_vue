<script setup lang="ts">
import { computed, inject, onBeforeMount, ref, type PropType } from 'vue';
import type AreaManager from '@/umbrella/AreaManager';

import ZoneComponent from './ZoneComponent.vue';
import type { IDistrict, IZone } from '@/interfaces/MapInterfaces';


const props = defineProps({
    handleCellClick: {
        type: Function,
        required: true
    },
    district: {
        type: Object as PropType<IDistrict>,
        required: true
    },
    clickedCell: {
        type: Object,
        required: true
    }
})
console.log('%c DistrictComponent got district:', 'color:darkgreen;', props.district)

const areaManager = inject ('areaManager') as AreaManager

let currentZone = ref<IZone>({} as IZone)

let isZoneFound = computed(() => {
    return currentZone.value.zoneCells && currentZone.value.zoneCells.length > 0
})

onBeforeMount(async () => {
    try{
        currentZone.value = await areaManager.getPlayerCurrentZone(props.district)
    } catch(_e: any){
        throw new TypeError('Error while loading zone')
    }
})
</script>

<template>
    <ZoneComponent
        v-if="isZoneFound"
        :zone="currentZone"
        :clickedCell="props.clickedCell"
        :handleCellClick="props.handleCellClick"
    ></ZoneComponent>
</template>

<style lang="scss">

</style>