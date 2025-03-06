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
            //?meta: { requiresAuth: true } // Mark route as requiring authentication
        },
    ],
})

/**
https://clouddevs.com/vue/authentication-with-jwt/


Protected Routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt');
  if (to.matched.some(route => route.meta.requiresAuth) && !token) {
    next('/login'); // Redirect to login page if token is missing for protected route
  } else {
    next();
  }
});



Token Expiration
// Example code to check token expiration
const token = localStorage.getItem('jwt');
const decodedToken = jwt_decode(token);
const currentTime = Date.now() / 1000;
if (decodedToken.exp < currentTime) {
  // Token has expired, user needs to log in again
}
*/

export default router
