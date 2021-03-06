import fetch from 'node-fetch'
import { getHeaders } from '../helpers'
import { unWrap, getErrorResponse } from '../../../utils/fetchUtils'

export default (algoliaConfig) => {
    const headers = getHeaders(algoliaConfig)
    const apiURL = `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users`

    return {
        async create(identity, payload) {
            try {
                return unWrap(await fetch(`${apiURL}/${identity.id}`, {
                    headers,
                    method: 'PUT',
                    body: JSON.stringify(payload)
                }))
            } catch (error) {
                return getErrorResponse(error)
            }
        },

        async getById(identity) {
            try {
                return unWrap(await fetch(`${apiURL}/${identity.id}`, { headers }))
            } catch (error) {
                return getErrorResponse(error)
            }
        }
    }
}
