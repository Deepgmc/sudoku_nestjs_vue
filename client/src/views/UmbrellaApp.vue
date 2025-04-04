<script setup lang="ts">
import { inject, onBeforeMount, provide } from 'vue';

import type { NetworkManager } from '@/network/NetworkManager';
import type { AuthManager } from '@/auth/AuthManager';
import UmbrellaManager from '@/umbrella/UmbrellaManager';
import type CellEntity from '@/umbrella/zoneEntities/CellObjects/CellEntity';
import type { TActionPayload } from '@/interfaces/MapInterfaces';
import AreaManager from '@/umbrella/AreaManager';
import PlayerManager from '@/umbrella/PlayerManager';
import Chat, { type IChatMessage } from '@/umbrella/Chat'

import AreaComponent from '@/components/map/AreaComponent.vue';
import Inventory from '@/components/player/Inventory.vue';
import InfoComponent from '@/components/InfoComponent.vue';
import Character from '@/components/player/Character.vue';
import ChatComponent from '@/components/ChatComponent.vue';



const $networkManager = inject('$networkManager') as NetworkManager
const $authManager = inject('$authManager') as AuthManager

//saving globaly auth and network to base umbrella class
UmbrellaManager.$authManager = $authManager;
UmbrellaManager.$networkManager = $networkManager;

//instantiating this objects, just they create a new instance
const areaManager: AreaManager = AreaManager.getInstance()
const player: PlayerManager = PlayerManager.getInstance()
const chat: Chat = new Chat(areaManager)

provide('areaManager', areaManager)
provide('player', player)
provide('chat', chat)


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
            <div class="player_block">
                <Character
                    :player="player"
                    class="block_component"
                ></Character>
                <Inventory
                    :inventory="player.inventory"
                    class="block_component"
                >
                </Inventory>
            </div>
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
</style>
