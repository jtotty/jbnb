import { sendJSON } from '../helpers'

export default (apis) => {
    /**
     * Create our user from the identy on the Request we set in the auth module.
     * @param {Request} req
     * @param {Response} res
     * @param {function} next
     */
    return async function getUserRoute(req, res, next) {
        const identity = req.identity
        const userData = await apis.user.getById(identity)

        if (userData.status === 200) {
            sendJSON(userData.json, res)
            return
        }

        const payload = makeUserPayload(identity)
        apis.user.create(req.identity, payload)
        sendJSON(payload, res)
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
