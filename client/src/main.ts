import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import SudokuApp from './SudokuApp.vue'
import router from './router/router.ts'

const app = createApp(SudokuApp)

app.config.errorHandler = (err, instance, info) => {
    // console.log('Global error hanlder starts')
    // console.log('instance:', instance)
    // console.log('My info:', info)
}

app.use(createPinia())
app.use(router)

app.mount('#sudoku_root_container')
