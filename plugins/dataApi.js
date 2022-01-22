export default function(context, inject) {
    const appId = 'V0JTIDTV6P'
    const apiKey = '290f174c7411dac329ec0192fd4d9995'

    inject('dataApi', {
        getHome
    })

    async function getHome(homeId) {
        const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
            headers: {
                'X-Algolia-API-Key': apiKey,
                'X-Algolia-Application-Id': appId
            }
        })

        const json = await response.json()

        return json
    }
}
