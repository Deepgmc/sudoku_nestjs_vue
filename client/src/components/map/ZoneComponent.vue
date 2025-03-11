<script setup lang="ts">
import type { ICell } from '@/interfaces/MapInterfaces';
/*
Сюда передаётся объект зоны - массив ячеек и всякая доп. инфа
Рендерим ячейки через CellComponent
*/

type PropsType = {
    cells: {
        type: ICell[],
        default: []
    }
}
const props = defineProps<PropsType>()

</script>



<template>
    <CellItem v-for="cell in props.cells"></CellItem>
</template>



<style lang="scss">

</style>