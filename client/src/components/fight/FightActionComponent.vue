<template>
    <div class="fight-container">
        <div class="units-info">
            <div class="left-side">
                <unit-info-component
                    :unit="player"
                    :isDndAllowed="false"
                    :isPlayer="true"
                    :isInventoryVisible="true"
                ></unit-info-component>
            </div>
            <div class="right-side">
                <unit-info-component
                    :unit="feature"
                    :isDndAllowed="false"
                    :isPlayer="false"
                    :isInventoryVisible="isInventoryVisible"
                    :lootInventory="lootInventory"
                >
                </unit-info-component>
            </div>
        </div>

        <q-separator style="margin: 20px 0 20px 0" color="orange" />

        <button v-if="!F.isStarted.value" @click="F.startFight()">Начать бой</button>
        <template v-else>
            <div class="fight-actions-container">
                <div class="left-side">
                    <div class="fight-actions">
                        <h5>Поставить блок</h5>
                        <q-option-group
                            :options="F.getHitParts('block')"
                            type="radio"
                            v-model="F.blockTargetu1.value"
                        />
                    </div>
                </div>
                <div class="right-side">
                    <div class="fight-actions">
                        <h5>Ударить</h5>
                        <q-option-group
                            :options="F.getHitParts('strike')"
                            type="radio"
                            v-model="F.strikeTargetu1.value"
                        />
                    </div>
                </div>
            </div>
            <div class="combat-log-block">
                <div class="left-side">
                    <button @click="F.roundFight()">&#129354;</button>
                </div>
                <div class="right-side combat-log">
                    <div class="combat-message-body" v-for="(message, index) in F.fightLogList" :key="index">
                        <!-- <span class="combat-message-who">{{ message.who }}</span> -->
                        <span class="combat-message-text" :class="{
                            red: message.color === 'red',
                            green: message.color === 'green',
                            black: message.color === 'black',
                        }"
                        >{{ message.text }}</span>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>


<script lang="ts" setup>
import { ref, type PropType } from 'vue';
import Fight from '@/umbrella/Fight'
import UnitInfoComponent from '@/components/unit/UnitInfoComponent.vue';
import PlayerManager from '@/umbrella/PlayerManager';
import type Unit from '@/umbrella/zoneEntities/Units/Unit';
import type { IInventory } from '@/interfaces/ItemsInterfaces';
import { useLootInventory } from '@/composables/lootInventory';

const props = defineProps({
    feature: {
        type: Object as PropType<Unit>,
        required: true
    },
})
const player = PlayerManager.getInstance()

// "Main object Fight. Includes fight and rounds"
const F = new Fight(player, props.feature, true, fightCallback)

const isInventoryVisible = ref<boolean>(false)



const lootInventory: IInventory = useLootInventory(4)

function fightCallback(): any {
    isInventoryVisible.value = true
    return lootInventory
}

</script>


<style lang="scss">
.fight-container {
    display: flex;
    flex-flow: column nowrap;
    .units-info{
        display: flex;
        flex-flow: row nowrap;
        .left-side, .right-side {
            width: 50%;
            margin-right:5px;
        }
    }
    .fight-actions-container{
        display:flex;
        flex-flow: row wrap;
        width:100%;
        height:100%;
        .left-side, .right-side{
            width: 50%;
            border: 1px dashed grey;
            padding: 5px;
        }
    }
    .combat-log-block{
        width:100%;
        display:flex;
        flex-flow: row nowrap;
        margin: 10px 0 0 0;
        .left-side{
            width:10%;
        }
        .right-side{
            width:90%;
        }
        .combat-log{
            display: flex;
            flex-flow: column nowrap;
            height: 200px;
            overflow-y: scroll;
            .combat-message-body {
                display: flex;
                flex-flow: row nowrap;
                .combat-message-who{
                    margin-right: 5px;
                    color:darkgreen;
                }
            }
        }
    }
    .black{
        color: $primary;
    }
    .green{
        color: $positive;
    }
    .red{
        color: $negative;
    }
}
</style>