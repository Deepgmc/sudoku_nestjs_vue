<script setup lang="ts">
import type { IPlayer } from '@/interfaces/PlayerInterfaces';
import type { PropType } from 'vue';

const props = defineProps({
    player: {
        type: Object as PropType<IPlayer>,
        required: true
    }
})
</script>

<template>
    <div class="characterComponent_container">
        <span class="char_player_icon" v-html="player.playerIcon"></span>
        <div class="char_stat_line">Уровень: {{ player.level }}</div>
        <div class="char_stat_line">Опыт: {{ player.experience }}</div>
        <div class="char_stat_line">Здоровье: {{ player.health }}</div>
        <div class="char_stat_line">Интеллект: {{ player.intellect }}</div>
        <div class="char_stat_line">Сила: {{ player.strength }}</div>
        <div class="char_stat_line">Ловкость: {{ player.agility }}</div>
    </div>
</template>

<style lang="scss">
.characterComponent_container{
    display: flex;
    flex-flow: column nowrap;
    .char_player_icon{
        font-size: 3em
    }
}
</style>
