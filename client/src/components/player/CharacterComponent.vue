<script setup lang="ts">
import type { PropType } from 'vue';
import ItemTooltip from '@/components/ItemTooltip.vue'
import { dragItem, dropItem } from '@/composables/dnd';

import type { IEquiped } from '@/interfaces/ItemsInterfaces';
import type PlayerManager from '@/umbrella/PlayerManager';
import type { IItem } from '@/interfaces/ItemsInterfaces';
import { equipSlots } from '@/constants';

const props = defineProps({
    player: {
        type: Object as PropType<PlayerManager>,
        required: true
    }
})

</script>

<template>
    <div class="characterComponent_container">
        <div class="character_stats">
            <span class="char_player_icon" v-html="player.playerIcon"></span>
            <div class="char_stat_line">Уровень: {{ player.level }}</div>
            <div class="char_stat_line">Опыт: {{ player.experience }}</div>
            <div class="char_stat_line">Здоровье: {{ player.health }}</div>
            <div class="char_stat_line">Интеллект: {{ player.intellect }}</div>
            <div class="char_stat_line">Сила: {{ player.strength }}</div>
            <div class="char_stat_line">Ловкость: {{ player.agility }}</div>
        </div>
        <div class="character_equiped">
            <div class="equiped_item"
                draggable="true"
                data-dnd_entity="equiped"
                @drop.stop="dropItem($event)"
                @dragenter.prevent=""
                @dragover.prevent=""
                @dragstart="dragItem($event, player.equiped[slot.name as keyof IEquiped], player)"

                v-for="slot in equipSlots"
                :key="slot.name"
                :data-slot_type="slot.name"
            >
                <div v-if="player.equiped[slot.name as keyof IEquiped]">
                    <span class="equiped_item_icon" v-html="player.equiped[slot.name as keyof IEquiped]?.icon"></span>
                    <ItemTooltip :item="(player.equiped[slot.name as keyof IEquiped] as IItem)"></ItemTooltip>
                </div>
                <div v-else class="equiped_item_icon_empty">{{ slot.textName }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.characterComponent_container{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .character_stats, .character_equiped{
        border: 1px solid darkgrey;
        display: flex;
        padding: 2px;
    }
    .character_stats{
        width:30%;
        flex-flow: column nowrap;
    }
    .character_equiped{
        width:70%;
        .equiped_item{
            border: 1px solid red;
            width: 70px;
            height: 70px;
            margin: 2px;
            font-size:0.8em;
            .equiped_item_icon{
                font-size: 4em;
                cursor: pointer;
            }
            .equiped_item_icon_empty{
                border: 1px solid green;
            }
        }
    }
    .char_player_icon{
        font-size: 3em
    }
}
</style>
