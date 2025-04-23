<template>
    <div class="fight-container">
        <div class="units-info">
            <div class="left-side">
                <UnitInfoComponent
                    :unit="player"
                    :isDndAllowed="false"
                ></UnitInfoComponent>
            </div>
            <div class="right-side">
                <UnitInfoComponent
                    :unit="feature"
                    :isDndAllowed="false"
                >
                </UnitInfoComponent>
            </div>
        </div>

        <button v-if="!F.isStarted.value" @click="F.startFight()">Начать бой</button>
        <div v-else class="fight-actions-container">
            <div class="left-side">
                <div class="fight-actions">
                    ACTIONS LEFT {{ F.unitLeft.textName }}
                </div>
            </div>
            <div class="right-side">
                <div class="fight-actions">
                    ACTIONS RIGHT {{ F.unitRight.textName }}
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref, type PropType } from 'vue';
import UnitInfoComponent from '@/components/unit/UnitInfoComponent.vue';
import PlayerManager from '@/umbrella/PlayerManager';
import type Unit from '@/umbrella/zoneEntities/Units/Unit';
import Fight from '@/umbrella/Fight'

const props = defineProps({
    feature: {
        type: Object as PropType<Unit>,
        required: true
    },
})
const player = PlayerManager.getInstance()

const F = new Fight(player, props.feature)


</script>


<style lang="scss">
.fight-container {
    display: flex;
    width: 900px;
    flex-flow: column nowrap;
    .left-side, .right-side{
        width: 50%;
        margin: 2px;
    }
    .units-info{
        display: flex;
        flex-flow: row nowrap;
    }
    .fight-actions-container{
        display:flex;
        flex-flow: row nowrap;
        border: 1px solid blue;
        width:100%;
        height:100%;
    }
}
</style>