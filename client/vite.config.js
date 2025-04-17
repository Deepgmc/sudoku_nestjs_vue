import * as nodeUrl from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
//import legacy from '@vitejs/plugin-legacy'


console.log('%c Vite.config NODE_ENV:', 'color:rgb(182, 86, 158);', process.env.NODE_ENV)


export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [
            vue(),
            vueDevTools(),
            //legacy({targets: ['defaults', 'not IE 11'],}),
            quasar({
                sassVariables: nodeUrl.fileURLToPath(
                    new URL('./src/quasar-variables.sass', import.meta.url)
                )
            })
        ],
        //root: 'src',
        build: {
            outDir: './dist',
            emptyOutDir: true,
            rollupOptions: {
                input: {
                    app: './index.html',
                },
            },
        },

        resolve: {
            alias: {
                '@': nodeUrl.fileURLToPath(new nodeUrl.URL('./src', import.meta.url))
            },
        },
        server: {
            open: true,
            //open: '/umbrella.html',
            //port: 5555,
            //disableHostCheck: true,
            proxy: {
                '/auth': {
                    target: `http://localhost:/${env.PROXY_DEV_PORT}`,
                    changeOrigin: true,//заголовок Origin
                    //rewrite: (path) => path.replace(/^\/api/, ''),
                },
                '/api': {
                    target: `http://localhost:${env.PROXY_DEV_PORT}/`,
                    changeOrigin: true,//заголовок Origin
                    //rewrite: (path) => path.replace(/^\/api/, ''),
                },
            }
        },
        // css: {
        //     preprocessorOptions: {
        //         scss: {
        //             additionalData: `@use "@/assets/globalVariables.scss" as *;`
        //         }
        //     }
        // },
    }

})
