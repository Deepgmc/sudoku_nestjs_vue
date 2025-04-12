<script setup lang="ts">
import { inject, onBeforeMount, provide, ref } from 'vue';

import type { NetworkManager } from '@/network/NetworkManager';
import type { AuthManager } from '@/auth/AuthManager';
import UmbrellaManager from '@/umbrella/UmbrellaManager';
import type CellEntity from '@/umbrella/zoneEntities/CellObjects/CellEntity';
import type { TActionPayload } from '@/interfaces/MapInterfaces';
import AreaManager from '@/umbrella/AreaManager';
import PlayerManager from '@/umbrella/PlayerManager';
import Chat from '@/umbrella/ChatManager'

import AreaComponent from '@/components/map/AreaComponent.vue';
import CharacterCard from '@/components/player/CharacterCard.vue';
import InfoComponent from '@/components/InfoComponent.vue';
import ChatComponent from '@/components/ChatComponent.vue';



const $networkManager = inject('$networkManager') as NetworkManager
const $authManager = inject('$authManager') as AuthManager

//saving globaly auth and network to base umbrella class
UmbrellaManager.$authManager = $authManager;
UmbrellaManager.$networkManager = $networkManager;

//instantiating this objects, just they create a new instance
const areaManager: AreaManager = AreaManager.getInstance()
const player: PlayerManager = PlayerManager.getInstance()
const chat: Chat = Chat.getInstance()

provide('areaManager', areaManager)
provide('player', player)
//provide('chat', chat)


onBeforeMount(() => {
    areaManager.init() //loading map
    player.init() //loading player data
})




const handleCellClick = function(x: number, y: number, cell: CellEntity){
    areaManager.store.clickedCell.cell = cell
    areaManager.store.clickedCell.x = x
    areaManager.store.clickedCell.y = y
}

/**
 * обработка событий игрока, ячейки, юнитов
 * @param actionPayload вся необходимая инфа по действию
 */
function handleInfoActions(actionPayload: TActionPayload){
    if(!areaManager.store.isCellClicked) return
    player.handleMapAction(actionPayload, (msg: any) => {
        chat.addMessage(msg)
    })
}

let currentDialogComponent: typeof CharacterCard
const isWindowCardOpen = ref(false)

const modalComponents = {
    CharacterCard: {
        component: CharacterCard,
        // params: {
        //     player: player
        // }
    },
    // Inventory: {
    //     component: Inventory,
    //     params: {
    //         inventory: player.inventory,
    //         player: player
    //     }
    // }
}

function loadModal(modalName: string): void {
    currentDialogComponent = modalComponents[modalName as keyof typeof modalComponents].component
    //currentDialogParams = modalComponents[modalName as keyof typeof modalComponents].params
    isWindowCardOpen.value = true
}

</script>

<template>
    <div class="umbrella-container">
        <div class="umbrella_map_container block_component">
            <AreaComponent
                v-if="areaManager.store.isStoreLoaded && player.store.isPlayerLoaded"
                :isCellClicked="areaManager.store.isCellClicked"
                :clickedCell="areaManager.store.clickedCell"
                :handleCellClick="handleCellClick"
            >
            </AreaComponent>
        </div>
        <div class="umbrella_info_container">



            <div class="umbrella_buttons_block">
                <div class="q-pa-md q-gutter-md">
                    <q-btn round color="black" icon="person" size="lg" @click="loadModal('CharacterCard')" />
                </div>
            </div>



            <q-dialog v-model="isWindowCardOpen" backdrop-filter="brightness(80%)">
                <q-card :dark="true" :bordered="true" style="min-width: 20vw">
                    <q-card-section>
                        <component :is="currentDialogComponent" :player="player"></component>
                        <!-- <Character
                            :player="player"
                        ></Character> -->
                    </q-card-section>
                    <!-- <q-card-section>
                        <Inventory
                            :inventory="player.inventory"
                        ></Inventory>
                    </q-card-section> -->

                    <!-- <q-separator />

                    <q-card-actions align="right">
                        <q-btn v-close-popup flat color="primary" label="Закрыть" />
                    </q-card-actions> -->

                </q-card>
            </q-dialog>









            <div class="umbrella_chat_block block_component">
                <ChatComponent
                    :chat="chat"
                    class="chat_component"
                ></ChatComponent>
            </div>
            <div class="umbrella_info_block">
                <InfoComponent
                    v-if="areaManager.store.isCellClicked"
                    :clickedCell="areaManager.store.clickedCell"
                    @info-actions-click="handleInfoActions"
                    class="block_component"
                >
                </InfoComponent>
            </div>
            <!-- <div class="player_block">
                <Character
                    :player="player"
                    class="block_component"
                ></Character>
                <Inventory
                    :inventory="player.inventory"
                    class="block_component"
                ></Inventory>
            </div> -->
        </div>
    </div>
</template>

<style lang="scss">
@use '@/assets/globalVariables.scss' as globals;
.umbrella-container {
    min-height: 100vh;
    display: flex;
    flex-direction: row;
}
.umbrella_map_container {
    display: flex;
    width: globals.$map-width;
    min-height: globals.$map-height;
}
.block_component{
    border: 2px dashed globals.$oliveColor;
    margin: 10px 5px 5px 5px;
    padding: 5px;
}

.umbrella_info_container{
    display: flex;
    flex-flow: column nowrap;
    & > div {
        // margin-top:20px;
        // padding-top: 5px;
    }
    .umbrella_info_block{
        width: globals.$info-width;
    }
    .player_block{
        width: globals.$info-width;
    }
}
.umbrella_chat_block {
    display:flex;
    flex-flow: column nowrap;
    width: globals.$chat-width;
    height: globals.$chat-block-height;
}
.umbrella_buttons_block {
    display:flex;
    flex-flow: column nowrap;
    width: globals.$info-width;
}
</style>
