import bodyParser from 'body-parser'
import getApis from './apis'
import userRouter from './routers/user'

/**
 * API middleware for creating users on Algolia.
 */
export default function() {
    const algoliaConfig = this.options.privateRuntimeConfig.algolia
    const apis = getApis(algoliaConfig)

    this.nuxt.hook('render:setupMiddleware', (app) => {
        app.use(bodyParser.urlencoded())
        app.use('/api/user', userRouter(apis))
    })
}
