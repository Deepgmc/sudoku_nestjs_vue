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

interface TClickedCell {
  cell: CellEntity | null,
  x: number,
  y: number
}
const clickedCell: TClickedCell = reactive({
    cell: null,
    x: 0,
    y: 0
})

const isCellClicked = computed(() => {
    return clickedCell.cell !== null
})
const handleCellClick = function(x: number, y: number, cell: CellEntity){
    clickedCell.cell = cell
    clickedCell.x = x
    clickedCell.y = y
}

</script>

<template>
    <div class="umbrella-container">
        <div class="umbrella_map_container">
            <AreaComponent
                v-if="areaManager.store.isStoreLoaded && player.store.isPlayerLoaded"
                :isCellClicked="isCellClicked"
                :handleCellClick="handleCellClick"
            >
            </AreaComponent>
        </div>
        <div class="umbrella_info_container">
            <InfoComponent
                v-if="isCellClicked"
                :clickedCell="clickedCell"
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
    border-right: 1px dotted rgb(163, 43, 43);
    border-bottom: 1px dotted rgb(163, 43, 43);
}
.umbrella_info_container{
    border: 1px solid rgb(54, 48, 134);
    width: g.$info-width;
    min-height: g.$info-height;
}
</style>
