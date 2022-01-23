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
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    label: this.$refs.citySearch.value
                }
            })
        }
    }
}
</script>
