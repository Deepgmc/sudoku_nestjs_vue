//import './assets/globalVariables.scss'
import './assets/main.scss'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'

import App from '@/App.vue'

const app = createApp(App)

app.config.errorHandler = function (err: any){
    console.log('%c Global erorr handler:', 'background:rgb(85, 0, 0); color: #bada55; padding: 3px; font-size:14px');
    console.log(err)
}

app.config.globalProperties.capitalizeFirstLetter = (val: string) => String(val).charAt(0).toUpperCase() + String(val).slice(1);

app.use(createPinia())

app.use(Quasar, {
    plugins: {},
})

app.mount('#umbrella_root_container')