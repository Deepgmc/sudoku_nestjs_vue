import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import SudokuApp from './SudokuApp.vue'
import router from './router/router.ts'

import  { NetworkManager } from '@/network/NetworkManager.ts'
import AuthManagerPlugin from '@/auth/AuthManager.ts'

const app = createApp(SudokuApp)

app.config.errorHandler = function (err: any){
    console.log('%c Global erorr handler:', 'background:rgb(85, 0, 0); color: #bada55; padding: 2px;font-size:14px');
    console.log(err)
}

app.provide('$networkManager', NetworkManager.getInstance())

app.use(router)
app.use(createPinia())
app.use(AuthManagerPlugin)

app.mount('#sudoku_root_container')