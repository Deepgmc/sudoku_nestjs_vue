<template>
    <div class="umbrella-container">
        <!-- <testComponent></testComponent> -->
        <!-- <img src="/nest.png" /> тестовая имгшка, грузится из public -->
        <dialog-component :player="player"></dialog-component>
        <div class="umbrella_map_container block_component">
            <AreaComponent
                v-if="areaManager.store.isStoreLoaded && player.store.isPlayerLoaded"
                :isCellClicked="areaManager.store.isCellClicked"
                :clickedCell="areaManager.store.getClickedCell()"
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



            <div class="umbrella_chat_block block_component">
                <ChatComponent
                    :chat="chat"
                    class="chat_component"
                ></ChatComponent>
            </div>
            <div class="umbrella_info_block">
                <InfoComponent
                    v-if="areaManager.store.isCellClicked"
                    :clickedCell="areaManager.store.getClickedCell()"
                    @info-actions-click="handleInfoActions"
                    class="block_component"
                >
                </InfoComponent>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { inject, onBeforeMount, provide, reactive, ref, type Component } from 'vue';

import type { NetworkManager } from '@/network/NetworkManager';
import type { AuthManager } from '@/auth/AuthManager';
import UmbrellaManager from '@/umbrella/UmbrellaManager';
import type CellEntity from '@/umbrella/zoneEntities/CellObjects/CellEntity';
import type { IChatMessage, TActionPayload } from '@/interfaces/MapInterfaces';
import AreaManager from '@/umbrella/AreaManager';
import PlayerManager from '@/umbrella/PlayerManager';
import Chat from '@/umbrella/ChatManager'

import { loadModal } from '@/composables/modal';

import AreaComponent from '@/components/map/AreaComponent.vue';
import InfoComponent from '@/components/InfoComponent.vue';
import ChatComponent from '@/components/ChatComponent.vue';
import DialogComponent from './dialog/DialogComponent.vue';




const $networkManager = inject('$networkManager') as NetworkManager
const $authManager = inject('$authManager') as AuthManager

UmbrellaManager.$authManager = $authManager;
UmbrellaManager.$networkManager = $networkManager;

//instantiating this objects, just they create a new instance
const areaManager: AreaManager = AreaManager.getInstance()
const player: PlayerManager = PlayerManager.getInstance()
const chat: Chat = Chat.getInstance()

provide('areaManager', areaManager)
provide('player', player)


onBeforeMount(() => {
    void areaManager.init() //loading map
    void player.init() //loading player data
})

/**
 * Запоминаем кликнутую ячейку
 * @param coords - ICoords {x: number, y: number}
 * @param cell CellEntity object
 */
const handleCellClick = function(x: number, y: number, cell: CellEntity){
    areaManager.store.setClickedCell(cell, {x: x, y: y})
}


/**
 * обработка событий игрока, ячейки, юнитов
 * @param actionPayload вся необходимая инфа по действию
 */
function handleInfoActions(actionPayload: TActionPayload){
    if(!areaManager.store.isCellClicked) throw new Error('handleInfoActions cellClicked Error')
    player.handleMapAction(actionPayload, (msg: IChatMessage) => {
        chat.addMessage(msg)
    })
}
</script>



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
        color: white;
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
