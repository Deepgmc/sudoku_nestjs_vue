<template>
    <div>
        <div class="unit_stat_line">Уровень: {{ unit.level }}</div>
        <div class="unit_stat_line">Опыт: {{ unit.experience }}/{{ unit.getUnitLevelExp(unit.level.value) }}</div>
        <div class="unit_stat_line">Здоровье: {{ unit.currentHealth }}/{{ unit.maxHealth }}</div>
        <div class="unit_stat_line">Урон: {{ unit.getDamage() }}</div>
        <div class="unit_stat_line">Броня: {{ unit.getArmor() }}</div>
        <div class="unit_stat_line">Интеллект: {{ unit.intellect }}</div>
        <div class="unit_stat_line">Сила: {{ unit.strength }}</div>
        <div class="unit_stat_line">Ловкость: {{ unit.agility }}</div>
    </div>
</template>


<script lang="ts" setup>
import type Unit from '@/umbrella/zoneEntities/Units/Unit';
import type { PropType } from 'vue';

const props = defineProps({
    unit: {
        type: Object as PropType<Unit>,
        required: true
    }
})
</script>


<style lang="scss">

</style>