<template>
    <div>
        <header style="background-color:#eee;">
            <NuxtLink to="/">
                Home
            </NuxtLink>

            <input ref="citySearch" type="text" @changed="changed">
        </header>
        <Nuxt />
    </div>
</template>

<script>
export default {
    mounted() {
        this.$maps.makeAutoComplete(this.$refs.citySearch)
    },

    methods: {
        changed(event) {
            const place = event.detail
            if (!place) { return }

            this.$router.push({
                name: 'searchCity',
                query: {
                    Lat: place.geometry.location.lat(),
                    Lng: place.geometry.location.lng(),
                    Label: this.$refs.citySearch.value
                }
            })
        }
    }
}
</script>
