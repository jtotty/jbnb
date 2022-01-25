import fetch from 'node-fetch'
import { unWrap, getErrorResponse } from '../utils/fetchUtils'

/**
 * API middleware for creating users on Algolia.
 */
export default function() {
    const algoliaConfig = this.options.privateRuntimeConfig.algolia
    const headers = {
        'X-Algolia-API-Key': algoliaConfig.key,
        'X-Algolia-Application-Id': algoliaConfig.appId
    }

    this.nuxt.hook('render:setupMiddleware', (app) => {
        app.use('/api/user', getUserRoute)
    })

    /**
     * Create our user from the identy on the Request we set in the auth module.
     * @param {Request} req
     * @param {Response} res
     * @param {function} next
     */
    async function getUserRoute(req, res, next) {
        const identity = req.identity
        const userData = await getUserById(identity)

        if (userData.status === 200) {
            sendJSON(userData.json, res)
            return
        }

        createUser(req.identity)
        sendJSON(makeUserPayload(identity), res)
    }

    /**
     * Call Algolia api to PUT new user.
     * @param {Object} identity
     * @returns Object
     */
    async function createUser(identity) {
        try {
            return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
                headers,
                method: 'PUT',
                body: JSON.stringify(makeUserPayload(identity))
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getUserById(identity) {
        try {
            return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/user/${identity.id}`, { headers }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    function sendJSON(data, res) {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
    }

    /**
     * Object user payload to send to the api.
     * @param {Object} identity
     * @returns Object
     */
    function makeUserPayload(identity) {
        return {
            name: identity.name,
            emai: identity.email,
            image: identity.image,
            homeId: [],
            reviewCount: 0,
            description: '',
            joined: new Date().toISOString()
        }
    }
}
