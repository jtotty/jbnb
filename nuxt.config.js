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
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/sass/app'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/maps.client',
        '~/plugins/dataApi',
        '~/plugins/auth.client'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // 'nuxt-vite',
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        '@nuxtjs/tailwindcss'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '~/modules/auth',
        '~/modules/algolia'
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
    },

    // https://nuxtjs.org/docs/directory-structure/nuxt-config#runtimeconfig
    publicRuntimeConfig: {
        auth: {
            cookieName: 'idToken',
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            mapsApiKey: process.env.GOOGLE_MAPS_API_KEY
        },
        algolia: {
            appId: process.env.ALGOLIA_APP_ID,
            key: process.env.ALGOLIA_PUB_KEY
        }
    },

    privateRuntimeConfig: {
        algolia: {
            appId: process.env.ALGOLIA_APP_ID,
            key: process.env.ALGOLIA_CUSTOM_KEY
        }
    }
}
