module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],
    plugins: [
    ],
    // add your custom rules here
    rules: {
        indent: ['error', 4],
        'space-before-function-paren': ['error', 'never'],
        'vue/html-indent': ['error', 4],
        'vue/multi-word-component-names': ['error', {
            ignores: ['default']
        }]
    }
}
