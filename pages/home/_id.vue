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

        <div ref="map" style="height:800px;width:800px;">

        </div>
    </div>
</template>

<script>
import homes from '~/data/homes'

export default {
    data() {
        return {
            home: {},
            map: {}
        }
    },

    head() {
        return {
            title: this.home.title,
            script: [{
                src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAfTvOJtD9baE61FGm7goN7fM76XQVR3a8&libraries=places',
                hid: 'map',
                defer: true
            }]
        }
    },

    created() {
        const home = homes.find(home => home.objectID === this.$route.params.id)
        this.home = home
    },

    mounted() {
        const mapOptions = {
            zoom: 18,
            center: new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng),
            disableDefaultUI: true,
            zoomControl: true
        }

        this.map = new window.google.maps.Map(this.$refs.map, mapOptions)

        const position = new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng)
        const marker = new window.google.maps.Marker({ position })
        marker.setMap(this.map)
    }
}
</script>
