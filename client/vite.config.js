import * as nodeUrl from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/globalVariables.scss" as *;`
            }
        }
    },
    resolve: {
        alias: {
            '@': nodeUrl.fileURLToPath(new nodeUrl.URL('./src', import.meta.url))
        },
    },
    server: {
        proxy: {
            '/auth': {
                target: 'http://localhost:3050/',
                changeOrigin: true,
                //rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/api': {
                target: 'http://localhost:3050/',
                changeOrigin: true,
                //rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    }
});
