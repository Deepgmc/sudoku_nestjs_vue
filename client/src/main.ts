import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
    console.log('Global error hanlder starts')
    //console.log('My error:', err)
    console.log('instance:', instance)
    console.log('My info:', info)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
