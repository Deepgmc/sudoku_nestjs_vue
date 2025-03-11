<script setup lang="ts">
import type { IArea } from '@/interfaces/MapInterfaces';
import DistrictComponent from './DistrictComponent.vue';

// type PropsType = {
//     area: any[]
// }
// const props = defineProps<PropsType>()

/*
Тут загружена вся карта целиком (area)
Тут же нужны данные от профиля юзера - какой district загружать.
Вычислить их и передать дальше в DistrictComponent
Внутри DistrictComponent тоже вычислить какую Zone загружать и передать её уже в ZoneComponent
*/

const props = defineProps<{area: IArea}>()

</script>

<template>
    <div class="umbrella_map">
        {{ props.area.areaName }}
        <!-- <DistrictComponent></DistrictComponent> -->
    </div>
</template>

<style lang="scss">

</style>