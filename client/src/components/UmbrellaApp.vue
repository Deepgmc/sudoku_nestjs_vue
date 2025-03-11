<script setup lang="ts">
import { inject, onBeforeMount, onMounted, reactive } from 'vue';

import AreaManager from '@/umbrella/AreaManager';
import AreaComponent from '@/components/map/AreaComponent.vue';
import type { NetworkManager } from '@/network/NetworkManager';
import type { AuthManager } from '@/auth/AuthManager';
import { useAreaStore } from '@/stores/areaStore'

const $networkManager = inject('$networkManager') as NetworkManager
const $authManager = inject('$authManager') as AuthManager

const areaStore = useAreaStore()

const areaManager = AreaManager.getInstance($networkManager, $authManager)

onMounted(() => {
    areaManager.init()
    // const gameSettings = $authManager.getUserUmbrellaSettings()
    // console.log('%c gameSettings:', 'color:rgb(182, 86, 158);', gameSettings)
})


</script>

<template>

    <div class="umbrella-container">
        <div class="flex-item map_container">
            <AreaComponent
                :area="areaStore.area">
            </AreaComponent>
            <div class="flex-item info_block info_block_bottom">Chat</div>
        </div>

        <div class="floating_container">
            <div class="flex-item info_block info_block_floating">Some options and credentials</div>
            <div class="flex-item info_block info_block_floating">info 2 (inventory)</div>
            <div class="flex-item info_block info_block_floating">info 3 (position)</div>
        </div>
    </div>

</template>

<style lang="scss">
.umbrella-container{
    min-height:100vh;
    // border-right: 1px inset black;
    // border-left: 1px inset black;
    display: flex;
    flex-direction: row;
}
.flex-item{
    border: 1px inset black;
    text-align: center;
    min-height: 200px;
}
.map_container{
    display: flex;
    flex-direction: column;
    //border: 1px inset grey;
    min-width: $map-width;
}
.umbrella_map{
    width: $map-width;
    height: $map-height;
}
.floating_container{
    display:flex;
    width:100%;
    flex-direction: column;
}
.info_block_bottom{
    width: $map-width;
}
.info_block_floating{
    width:100%;
    min-width: 300px;
    max-width: 450px;
    height:20vh;
}

@media screen and (max-width:1100px){
    .umbrella-container{
        flex-direction: column;
    }
    .info_block_floating{
        max-width: $map-width;
    }
}
</style>
