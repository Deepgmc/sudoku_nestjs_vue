<script setup lang="ts">
import { inject, onBeforeMount, onMounted, reactive, provide } from 'vue';

import type { NetworkManager } from '@/network/NetworkManager';
import type { AuthManager } from '@/auth/AuthManager';
import AreaManager from '@/umbrella/AreaManager';
import Player from '@/umbrella/Player';
import AreaComponent from '@/components/map/AreaComponent.vue';

const $networkManager = inject('$networkManager') as NetworkManager
const $authManager = inject('$authManager') as AuthManager

const areaManager = AreaManager.getInstance($networkManager, $authManager)
const player = Player.getInstance($networkManager, $authManager)

provide('areaManager', areaManager)
provide('player', player)

onBeforeMount(() => {
    areaManager.init() //loading map
    player.init() //loading player data
})


</script>

<template>

    <div class="umbrella-container">
        <div class="flex-item map_container">
            <AreaComponent
                v-if="areaManager.store.isStoreLoaded && player.store.isPlayerLoaded"
                :area="areaManager.store.area">
            </AreaComponent>
            <!-- <div class="flex-item info_block info_block_bottom">Chat</div> -->
        </div>

        <!-- <div class="floating_container">
            <div class="flex-item info_block info_block_floating">Some options and credentials</div>
            <div class="flex-item info_block info_block_floating">info 2 (inventory)</div>
            <div class="flex-item info_block info_block_floating">info 3 (position)</div>
        </div> -->
    </div>

</template>

<style lang="scss">
//@import '@/assets/globalVariables.scss';
@use '@/assets/globalVariables.scss' as g;
.umbrella-container {
    min-height: 100vh;
    // border-right: 1px inset black;
    // border-left: 1px inset black;
    display: flex;
    flex-direction: row;
}

.flex-item {
    // border: 1px inset black;
    text-align: center;
    min-height: 200px;
}

.map_container {
    display: flex;
    flex-direction: column;
    //border: 1px inset grey;
    min-width: g.$map-width;
    border: 1px solid rgb(77, 44, 44);
}

.umbrella_map {
    // width: g.$map-width;
    min-height: g.$map-height;
    border: 1px solid rgb(77, 44, 44);
}

.floating_container {
    display: flex;
    width: 100%;
    flex-direction: column;
}

.info_block_bottom {
    width: g.$map-width;
}

.info_block_floating {
    width: 100%;
    min-width: 300px;
    max-width: 450px;
    height: 20vh;
}

@media screen and (max-width:1100px) {
    // .umbrella-container {
    //     flex-direction: column;
    // }

    // .info_block_floating {
    //     max-width: g.$map-width;
    // }
}
</style>
