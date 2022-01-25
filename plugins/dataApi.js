import { unWrap, getErrorResponse } from '~/utils/fetchUtils'

export default function({ $config }, inject) {
    const headers = {
        'X-Algolia-API-Key': $config.algolia.key,
        'X-Algolia-Application-Id': $config.algolia.appId
    }

    inject('dataApi', {
        getHome,
        getReviewsByHomeId,
        getUserByHomeId,
        getHomeByLocation
    })

    /**
     * Retrieve a home by its id.
     * @param {number} homeId
     * @returns {({unWrap}|{getErrorResponse})}
     */
    async function getHome(homeId) {
        try {
            return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
                headers
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    /**
     * Get reviews by home id.
     * @param {number} homeId
     * @returns {({unWrap}|{getErrorResponse})}
     */
    async function getReviewsByHomeId(homeId) {
        try {
            return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/reviews/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    hitsPerPage: 6,
                    attributesToHighlight: []
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    /**
     * Get a user by the home id.
     * @param {number} homeId
     * @returns {({unWrap}|{getErrorResponse})}
     */
    async function getUserByHomeId(homeId) {
        try {
            return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/users/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    attributesToHighlight: []
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    /**
     * Get a home by its lat, lng, and radius in meters.
     * @param {number} lat
     * @param {number} lng
     * @param {number} radiusInMeters
     * @returns {({unWrap}|{getErrorResponse})}
     */
    async function getHomeByLocation(lat, lng, radiusInMeters = 1500) {
        try {
            return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    aroundLatLng: `${lat},${lng}`,
                    aroundRadius: radiusInMeters,
                    hitsPerPage: 10,
                    attributesToHighlight: []
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }
}
