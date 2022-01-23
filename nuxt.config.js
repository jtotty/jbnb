export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'JBnB',
        titleTemplate: 'JBnB %s',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'The best place to stay in the world!' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        bodyAttrs: {
            class: ['my-style']
        }
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/sass/app'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/maps.client',
        '~/plugins/dataApi'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        '@nuxtjs/tailwindcss'
        // 'nuxt-vite'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extractCSS: true,
        loaders: {
            limit: 0
        }
    },

    router: {
        prefetchLinks: false
    }
}
