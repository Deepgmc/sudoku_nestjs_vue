<script setup lang="ts">
import { provide } from 'vue'
import AuthView from '@/views/AuthView.vue';
import UmbrellaApp from '@/components/UmbrellaApp.vue';
import AuthLoading from '@/views/AuthLoading.vue'
import { useAuthStore } from '@/stores/auth'

import NetworkManager from '@/network/NetworkManager'
import { AuthManager } from '@/auth/AuthManager'
import { jwtStrategy } from '@/auth/strategies/jwt.strategy'

const authStore = useAuthStore()
const $networkManager = NetworkManager.getInstance()

provide('$networkManager', NetworkManager.getInstance())
provide('$authManager', AuthManager.getInstance( new jwtStrategy($networkManager), authStore) )


</script>

<template>
    <main class="auth_login_container" v-if="!authStore.isLogined || authStore.authLoading">
        <AuthLoading v-if="authStore.authLoading"></AuthLoading>
        <AuthView v-if="!authStore.isLogined && !authStore.authLoading"></AuthView>
    </main>
    <UmbrellaApp
        class="main_container"
        v-if="!authStore.authLoading && authStore.isLogined"
    ></UmbrellaApp>
</template>

<style lang="scss">



</style>
