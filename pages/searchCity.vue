<template>
    <div>
        {{ lat }} / {{ lng }} / {{ label }}
        <div v-for="home in homes" :key="home.objectID">
            {{ home.title }}<br>
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ query, $dataApi }) {
        const data = await $dataApi.getHomeByLocation(query.lat, query.lng)

        return {
            homes: data.json.hits,
            label: query.label,
            lat: query.lat,
            lng: query.lng
        }
    },

    watchQuery: ['lat']
}
</script>
