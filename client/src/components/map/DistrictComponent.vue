<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref } from 'vue';
import type AreaManager from '@/umbrella/AreaManager';

import ZoneComponent from './ZoneComponent.vue';
import type { IZone } from '@/interfaces/MapInterfaces';



const props = defineProps(['district'])
console.log('%c DistrictComponent got district:', 'color:darkgreen;', props.district)

const areaManager = inject ('areaManager') as AreaManager

let currentZone: IZone = reactive({} as IZone)

let isZoneFound = computed(() => {
    return currentZone.zoneName && currentZone.zoneName.length > 0
})

onMounted(async () => {
    //get ZONE for current player
    currentZone = await areaManager.getPlayerCurrentZone(props.district)
    //if(currentZone.zoneName.length > 0) isZoneFound.value = true
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