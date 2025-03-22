<script setup lang="ts">
import { inject, onBeforeMount, onMounted, reactive, provide, computed } from 'vue';

import type { NetworkManager } from '@/network/NetworkManager';
import type { AuthManager } from '@/auth/AuthManager';
import AreaManager from '@/umbrella/AreaManager';
import PlayerManager from '@/umbrella/PlayerManager';
import AreaComponent from '@/components/map/AreaComponent.vue';
import InfoComponent from '@/components/InfoComponent.vue';
import UmbrellaManager from '@/umbrella/UmbrellaManager';
import type CellEntity from '@/umbrella/zoneEntities/CellEntity';
import ZoneManager from '@/umbrella/ZoneManager';
import type { TClickedCell } from '@/interfaces/MapInterfaces';

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


const clickedCell: TClickedCell = reactive({
    cell: undefined,
    x: undefined,
    y: undefined
})

const isCellClicked = computed(() => {
    return clickedCell.cell !== null
})
const handleCellClick = function(x: number, y: number, cell: CellEntity){
    clickedCell.cell = cell
    clickedCell.x = x
    clickedCell.y = y
}

function handleInfoActions(payload: any){
    const zoneManager = ZoneManager.getInstance()
    switch (payload.action) {
        case 'movePlayer':
            zoneManager.setAndMovePlayer(player, payload.payload.x, payload.payload.y)
            break;
        default:
            break;
    }

}

</script>

<template>
    <div class="umbrella-container">
        <div class="umbrella_map_container">
            <AreaComponent
                v-if="areaManager.store.isStoreLoaded && player.store.isPlayerLoaded"
                :isCellClicked="isCellClicked"
                :clickedCell="clickedCell"
                :handleCellClick="handleCellClick"
            >
            </AreaComponent>
        </div>
        <div class="umbrella_info_container">
            <InfoComponent
                v-if="isCellClicked"
                :clickedCell="clickedCell"
                @actions-click="handleInfoActions"
            >
            </InfoComponent>
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
    width: g.$info-width;
    min-height: g.$info-height;
}
</style>
