<script setup lang="ts">
import { inject, onMounted } from 'vue';
import type { IArea } from '@/interfaces/MapInterfaces';
import type AreaManager from '@/umbrella/AreaManager';

/*
Тут загружена вся карта целиком (area)
Тут же нужны данные от профиля юзера - какой district загружать.
Вычислить их и передать дальше в DistrictComponent
Внутри DistrictComponent тоже вычислить какую Zone загружать и передать её уже в ZoneComponent
*/

const props = defineProps<{area: IArea}>()
const areaManager = inject ('areaManager') as AreaManager

onMounted(() => {
    const currentDistrict = areaManager.getPlayerDistrict()
    console.log('%c currentDistrict (at area component):', 'color:rgb(182, 86, 158);', currentDistrict)
})

</script>

<template>
    <div class="umbrella_map">
        {{ props.area.areaName }}
        <!-- <DistrictComponent></DistrictComponent> -->
    </div>
</template>

<style lang="scss">

</style>