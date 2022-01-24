<template>
    <div class="app">
        <header class="app-header">
            <NuxtLink :to="`/`">
                <button class="app-logo">
                    <img src="/images/logo.svg">
                </button>
            </NuxtLink>
            <div class="app-search">
                <input ref="citySearch" type="text" placeholder="Enter your address" @changed="changed">
                <input type="text" class="datepicker" placeholder="Check in">
                <input type="text" class="datepicker" placeholder="Check out">
                <button>
                    <img src="/images/icons/search.svg">
                </button>
            </div>
            <div class="app-user-menu">
                <img src="/images/icons/house.svg">
                <div class="name">
                    Host
                </div>
                <div id="googleButton"></div>
            </div>
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
