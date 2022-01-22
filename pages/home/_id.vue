<template>
    <div>
        <div style="display:flex">
            <img
                v-for="image in home.images"
                :key="image"
                :src="image"
                alt="something descriptive.."
                width="200"
                height="150"
            >
        </div>

        {{ home.title }}<br>
        ${{ home.pricePerNight }} / night<br>
        <img src="/images/marker.svg" width="20" height="20">{{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}<br>
        <img src="/images/star.svg" width="20" height="20">{{ home.reviewValue }}<br>
        {{ home.guests }} guests, {{ home.bedrooms }} bedrooms, {{ home.beds }} beds, {{ home.bathrooms }} bathrooms<br>
        {{ home.description }}

        <div ref="map" style="height:800px;width:800px;" />
    </div>
</template>

<script>
export default {
    async asyncData({ params, $dataApi }) {
        const home = await $dataApi.getHome(params.id)
        return { home }
    },

    head() {
        return {
            title: this.home.title
        }
    },

    mounted() {
        this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
    }
}
</script>
