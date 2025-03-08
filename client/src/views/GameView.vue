<script setup lang="ts">
import type { IAuthManager } from '@/interfaces/Auth';
import { inject } from 'vue';

const $authManager: IAuthManager = inject('$authManager') as IAuthManager;

function logOut(){
    $authManager.logOut()
}
</script>

<template>
    Game view
    <button @click="logOut">LogOut</button>
    <button>Check (off)</button>
</template>
