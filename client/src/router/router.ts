import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: AuthView,
        },
        {
            path: '/',
            name: 'game',
            component: () => import('../views/GameView.vue'),
        },
    ],
})

export default router
