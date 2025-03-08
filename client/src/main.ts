import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
//import router from './router/router.ts'

const app = createApp(App)

app.config.errorHandler = function (err: any){
    console.log('%c Global erorr handler:', 'background:rgb(85, 0, 0); color: #bada55; padding: 2px;font-size:14px');
    console.log(err)
}




//app.use(router)
app.use(createPinia())

app.mount('#sudoku_root_container')