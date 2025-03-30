//import './assets/globalVariables.scss'
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

app.config.globalProperties.capitalizeFirstLetter = (val: string) => String(val).charAt(0).toUpperCase() + String(val).slice(1);



//app.use(router)
app.use(createPinia())

app.mount('#umbrella_root_container')