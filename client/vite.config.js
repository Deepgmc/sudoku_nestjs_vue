import * as nodeUrl from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
// https://vite.dev/config/

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
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
            open: true,
            proxy: {
                '/auth': {
                    target: `http://localhost:/${env.PROXY_DEV_PORT}`,
                    changeOrigin: true,
                    //rewrite: (path) => path.replace(/^\/api/, ''),
                },
                '/api': {
                    target: `http://localhost:${env.PROXY_DEV_PORT}/`,
                    changeOrigin: true,
                    //rewrite: (path) => path.replace(/^\/api/, ''),
                },
            }
        }
    }

})
