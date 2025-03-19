<script setup lang="ts">
import { computed, inject, onBeforeMount, onMounted, reactive, ref } from 'vue';
import type { IArea, IDistrict } from '@/interfaces/MapInterfaces';
import type AreaManager from '@/umbrella/AreaManager';

import DistrictComponent from './DistrictComponent.vue';

/*
Тут загружена вся карта целиком (area)
Тут же нужны данные от профиля юзера - какой district загружать.
Вычислить их и передать дальше в DistrictComponent
Внутри DistrictComponent тоже вычислить какую Zone загружать и передать её уже в ZoneComponent
Всё через пропсы
*/
const areaManager = inject ('areaManager') as AreaManager

const props = defineProps(['handleCellClick'])
let currentDistrict: IDistrict = reactive({} as IDistrict)
const isDistrictFound = computed(() => {
    return currentDistrict.zones.length > 0
})

onBeforeMount(() => {
    currentDistrict = areaManager.getPlayerCurrentDistrict()
    //console.log('%c areaComponent found currentDistrict:', 'color:darkgreen;', currentDistrict)
})

</script>

<template>
    <DistrictComponent
        @cell-click="handleCellClick"
        v-if="isDistrictFound"
        :district="currentDistrict"
        :handleCellClick="props.handleCellClick"
    ></DistrictComponent>
</template>

<style lang="scss">

</style>