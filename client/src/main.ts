import './assets/main.scss'

import { createApp, type ComponentPublicInstance } from 'vue'
import { createPinia } from 'pinia'

import SudokuApp from './SudokuApp.vue'
import router from './router/router.ts'

import  { NetworkManager } from '@/network/NetworkManager.ts'
import AuthManager from '@/auth/AuthManager.ts'

const app = createApp(SudokuApp)

app.config.errorHandler = function(
    err: any,
    ComponentInstance: ComponentPublicInstance | null,
    info: string
){
    console.log('%c Global erorr handler:', 'background:rgb(85, 0, 0); color: #bada55; padding: 5px;font-size:16px');
    console.error(`Error: ${err.toString()}`, `Info: ${info}`);
}

app.provide('$networkManager', NetworkManager.getInstance())

app.use(createPinia())
app.use(router)

app.use(AuthManager)

app.mount('#sudoku_root_container')
