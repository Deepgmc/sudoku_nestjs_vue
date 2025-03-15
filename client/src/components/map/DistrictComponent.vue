<script setup lang="ts">
import { computed, inject, onBeforeMount, onMounted, reactive, ref } from 'vue';
import type AreaManager from '@/umbrella/AreaManager';

import ZoneComponent from './ZoneComponent.vue';
import type { IZone } from '@/interfaces/MapInterfaces';



const props = defineProps(['district'])
console.log('%c DistrictComponent got district:', 'color:darkgreen;', props.district)

const areaManager = inject ('areaManager') as AreaManager

let currentZone = ref<IZone>({} as IZone)

let isZoneFound = computed(() => {
    return currentZone.value.zoneCells && currentZone.value.zoneCells.length > 0
})

onBeforeMount(async () => {
    //get ZONE for current player
    try{
        currentZone.value = await areaManager.getPlayerCurrentZone(props.district)
    } catch(_e: any){
        throw new TypeError('Error while loading zone')
    }

    console.log('%c currentZone.value:', 'color:rgb(182, 86, 158);', currentZone.value)
})
</script>

<template>
    <ZoneComponent
        v-if="isZoneFound"
        :zone="currentZone"
    ></ZoneComponent>
</template>

<style lang="scss">

</style>