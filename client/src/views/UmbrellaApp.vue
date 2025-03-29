<script setup lang="ts">
import { inject, onBeforeMount, provide } from 'vue';

import type { NetworkManager } from '@/network/NetworkManager';
import type { AuthManager } from '@/auth/AuthManager';
import AreaManager from '@/umbrella/AreaManager';
import PlayerManager from '@/umbrella/PlayerManager';
import AreaComponent from '@/components/map/AreaComponent.vue';
import Inventory from '@/components/player/Inventory.vue';
import InfoComponent from '@/components/InfoComponent.vue';
import UmbrellaManager from '@/umbrella/UmbrellaManager';
import type CellEntity from '@/umbrella/zoneEntities/CellObjects/CellEntity';
import type MapAction from '@/umbrella/actions/MapAction';

const $networkManager = inject('$networkManager') as NetworkManager
const $authManager = inject('$authManager') as AuthManager

//saving globaly auth and network to base umbrella class
UmbrellaManager.$authManager = $authManager;
UmbrellaManager.$networkManager = $networkManager;

//instantiating this objects, just they create a new instance
const areaManager = AreaManager.getInstance()
const player = PlayerManager.getInstance()

provide('areaManager', areaManager)
provide('player', player)


onBeforeMount(() => {
    areaManager.init() //loading map
    player.init() //loading player data
})


const handleCellClick = function(x: number, y: number, cell: CellEntity){
    areaManager.store.clickedCell.cell = cell
    areaManager.store.clickedCell.x = x
    areaManager.store.clickedCell.y = y
}

function handleInfoActions(action: MapAction){
    if(!areaManager.store.isCellClicked) return
    console.log('%c action:', 'color:rgb(182, 86, 158);', action)
    player.handleMapAction(action)
}

</script>

<template>
    <div class="umbrella-container">
        <div class="umbrella_map_container">
            <AreaComponent
                v-if="areaManager.store.isStoreLoaded && player.store.isPlayerLoaded"
                :isCellClicked="areaManager.store.isCellClicked"
                :clickedCell="areaManager.store.clickedCell"
                :handleCellClick="handleCellClick"
            >
            </AreaComponent>
        </div>
        <div class="umbrella_info_container">
            <div class="info_block">
                <InfoComponent
                    v-if="areaManager.store.isCellClicked"
                    :clickedCell="areaManager.store.clickedCell"
                    @info-actions-click="handleInfoActions"
                >
                </InfoComponent>
            </div>
            <div class="inventory_block">
                <Inventory :inventory="player.inventory"></Inventory>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/assets/globalVariables.scss' as g;
.umbrella-container {
    min-height: 100vh;
    display: flex;
    flex-direction: row;
}

.umbrella_map_container {
    display: flex;
    width: g.$map-width;
    min-height: g.$map-height;
}
.umbrella_info_container{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    & > div {
        margin-top:20px;
        border-top: 3px dashed rgb(44, 56, 0);
        padding-top: 5px;
    }
    .info_block{
        width: g.$info-width;
    }
    .inventory_block{
        width: g.$info-width;
    }
}
// .umbrella_info_container > div {
//     margin-top:20px;
// }
</style>
