<script setup lang="ts">
import { inject, onBeforeMount, onMounted, reactive, ref } from 'vue';
import type { IArea, IDistrict } from '@/interfaces/MapInterfaces';
import type AreaManager from '@/umbrella/AreaManager';

import DistrictComponent from './DistrictComponent.vue';

/*
Тут загружена вся карта целиком (area)
Тут же нужны данные от профиля юзера - какой district загружать.
Вычислить их и передать дальше в DistrictComponent
Внутри DistrictComponent тоже вычислить какую Zone загружать и передать её уже в ZoneComponent
*/

const props = defineProps<{area: IArea}>()
console.log('%c AreaComponent got area:', 'color:darkgreen;', props.area)
const areaManager = inject ('areaManager') as AreaManager

let currentDistrict: IDistrict = reactive({} as IDistrict)
const isDistrictFound = ref<boolean>(false)

onBeforeMount(() => {
    //get DISTRICT for current player
    currentDistrict = areaManager.getPlayerCurrentDistrict()
    if(currentDistrict.zones.length > 0) isDistrictFound.value = true
    console.log('%c areaComponent found currentDistrict:', 'color:red;', currentDistrict)
})

</script>

<template>
    <div class="umbrella_map">
        {{ props.area.areaName }}
        <DistrictComponent
            v-if="isDistrictFound"
            :district="currentDistrict"
        ></DistrictComponent>
    </div>
</template>

<style lang="scss">

</style>