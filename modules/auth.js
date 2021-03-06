import cookie from 'cookie'
import { OAuth2Client } from 'google-auth-library'

/**
 * Authentication middleware.
 */
export default function() {
    const authConfig = this.options.publicRuntimeConfig.auth

    this.nuxt.hook('render:setupMiddleware', (app) => {
        app.use('/api', handler)
    })

    // SPA mode for admin routes
    this.nuxt.hook('render:setupMiddleware', (app) => {
        app.use('/admin', (req, res, next) => {
            res.spa = true
            next()
        })
    })

    /**
     * Handle the request and set identity property.
     * @param {Request} req
     * @param {Responst} res
     * @param {function} next
     */
    async function handler(req, res, next) {
        const idToken = cookie.parse(req.headers.cookie)[authConfig.cookieName]
        if (!idToken) { return rejectHit(res) }

        const ticket = await getUser(idToken)
        if (!ticket) { return rejectHit(res) }

        req.identity = {
            id: ticket.sub,
            email: ticket.email,
            name: ticket.name,
            image: ticket.picture
        }

        next()
    }

    /**
     * Get the Google User that's logged in.
     * @param {number} idToken
     * @returns Object
     */
    async function getUser(idToken) {
        const client = new OAuth2Client(authConfig.clientId)

        try {
            const ticket = await client.verifyIdToken({
                idToken,
                audience: authConfig.clientId
            })

            return ticket.getPayload()
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
        }
    }

    /**
     * Reject the response.
     * @param {Object} res
     */
    function rejectHit(res) {
        res.statusCode = 401
        res.end()
    }
}
