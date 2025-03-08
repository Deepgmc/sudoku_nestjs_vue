<script setup lang="ts">
import { provide, inject } from 'vue'
//import { RouterLink, RouterView } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import GameView from '@/views/GameView.vue'
import { useAuthStore } from '@/stores/auth'




import { NetworkManager } from './network/NetworkManager'
import { AuthManager } from './auth/AuthManager'
import { jwtStrategy } from '@/auth/strategies/jwt.strategy'


const $networkManager = NetworkManager.getInstance()
console.log('$networkManager created at MainApp.vue:', $networkManager)
provide('$networkManager', $networkManager)


provide('$authManager', AuthManager.getInstance( new jwtStrategy(), useAuthStore()) )
console.log('$authManager created at MainApp.vue')



const authStore = useAuthStore()
</script>

<template>
    <main class="main_container">
        <AuthView v-if="!authStore.isLogined"></AuthView>
        <GameView v-else></GameView>
        <!-- <RouterLink to="/login">Auth</RouterLink>
        <RouterLink to="/">Game</RouterLink> -->
        <!-- <RouterView /> -->
    </main>
</template>

<style lang="scss">


</style>
