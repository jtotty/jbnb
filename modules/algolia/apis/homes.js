import fetch from 'node-fetch'
import { getHeaders } from '../helpers'
import { unWrap, getErrorResponse } from '../../../utils/fetchUtils'

export default (algoliaConfig) => {
    const headers = getHeaders(algoliaConfig)
    const apiURL = `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes`

    return {
        async create(homeId, payload) {
            try {
                return unWrap(await fetch(`${apiURL}/${homeId}`, {
                    headers,
                    method: 'PUT',
                    body: JSON.stringify(payload)
                }))
            } catch (error) {
                return getErrorResponse(error)
            }
        }
    }
}
