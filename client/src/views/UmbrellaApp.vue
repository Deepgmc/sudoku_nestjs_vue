<script setup lang="ts">
import type { IAuthManager } from '@/interfaces/Auth';
import { inject, ref } from 'vue';

const $authManager: IAuthManager = inject('$authManager') as IAuthManager;



function logOut(){$authManager.logOut()}
</script>

<template>

    <div class="umbrella-container">
        <div class="flex-item map_container">
            <div class="umbrella_map">map</div>
            <div class="flex-item info_block info_block_bottom">Chat</div>
        </div>

        <div class="floating_container">
            <div class="flex-item info_block info_block_floating"><button @click="logOut">LogOut</button></div>
            <div class="flex-item info_block info_block_floating">info 2 (inventory)</div>
            <div class="flex-item info_block info_block_floating">info 3 (position)</div>
        </div>
    </div>

</template>

<style lang="scss">
.umbrella-container{
    min-height:100vh;
    border: 1px inset violet;
    display: flex;
    flex-direction: row;
}
.flex-item{
    border: 1px inset blue;
    text-align: center;
    min-height: 200px;
}
.map_container{
    display: flex;
    flex-direction: column;
    border: 1px inset red;
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
