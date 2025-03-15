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
*/

const props = defineProps<{area: IArea}>()
const areaManager = inject ('areaManager') as AreaManager

let currentDistrict: IDistrict = reactive({} as IDistrict)
//const isDistrictFound = ref<boolean>(false)
const isDistrictFound = computed(() => {
    return currentDistrict.zones.length > 0
})

onBeforeMount(() => {
    //get DISTRICT for current player
    currentDistrict = areaManager.getPlayerCurrentDistrict()
    //console.log('%c areaComponent found currentDistrict:', 'color:darkgreen;', currentDistrict)
})

</script>

<template>
    <div class="umbrella_map">
        <DistrictComponent
            v-if="isDistrictFound"
            :district="currentDistrict"
        ></DistrictComponent>
    </div>
</template>

<style lang="scss">

</style>