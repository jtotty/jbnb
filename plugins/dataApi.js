export default function(context, inject) {
    const appId = 'V0JTIDTV6P'
    const apiKey = '290f174c7411dac329ec0192fd4d9995'
    const headers = {
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId
    }

    inject('dataApi', {
        getHome
    })

    async function getHome(homeId) {
        try {
            return unWrap(
                await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers })
            )
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function unWrap(response) {
        const json = await response.json()
        const { ok, status, statusText } = response

        return {
            json,
            ok,
            status,
            statusText
        }
    }

    function getErrorResponse(error) {
        return {
            ok: false,
            status: 500,
            statusText: error.message,
            json: {}
        }
    }
}
