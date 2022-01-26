<template>
    <div>
        [list opf homes]
        <h2 class="text-xl bold">
            Add a home
        </h2>
        <form class="form" @submit.prevent="onSubmit">
            <ImageUploader />
            Images<br>
            <input v-model="home.images[0]" type="text" class="w-3/4"><br>
            <input v-model="home.images[1]" type="text" class="w-3/4"><br>
            <input v-model="home.images[2]" type="text" class="w-3/4"><br>
            <input v-model="home.images[3]" type="text" class="w-3/4"><br>
            <input v-model="home.images[4]" type="text" class="w-3/4"><br>

            Title<br>
            <input v-model="home.title" type="text" class="w-60"><br>

            Description<br>
            <textarea v-model="home.description" class="w-104" /><br>

            Note<br>
            <textarea v-model="home.note" class="w-104" /><br>

            Features<br>
            <input v-model="home.features[0]" type="text" class="w-26"><br>
            <input v-model="home.features[1]" type="text" class="w-26"><br>
            <input v-model="home.features[2]" type="text" class="w-26"><br>
            <input v-model="home.features[3]" type="text" class="w-26"><br>
            <input v-model="home.features[4]" type="text" class="w-26"><br>

            Price Per Night<br>
            <input v-model="home.pricePerNight" type="number" class="w-14"><br>

            Guests / Rooms / Beds / Baths<br>
            <input v-model="home.guests" type="number" class="w-14">
            <input v-model="home.bedrooms" type="number" class="w-14">
            <input v-model="home.beds" type="number" class="w-14">
            <input v-model="home.bathrooms" type="number" class="w-14"><br>

            <input ref="locationSelector" type="text" autocomplete="off" placeholder="Select a location" @changed="changed"><br>

            Address <input v-model="home.location.address" type="text" class="w-60"><br>
            City <input v-model="home.location.city" type="text" class="w-60"><br>
            State <input v-model="home.location.state" type="text" class="w-60"><br>
            Postal Code <input v-model="home.location.postalCode" type="text" class="w-60"><br>
            Country <input v-model="home.location.country" type="text" class="w-60"><br>

            <button class="border px-4 py-2 border-gray-400">
                Add
            </button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            home: {
                title: '',
                description: '',
                note: '',
                pricePerNight: '',
                guests: '',
                bedrooms: '',
                beds: '',
                bathrooms: '',
                features: Array(5).fill(''),
                location: {
                    address: '',
                    city: '',
                    state: '',
                    postalCode: '',
                    country: ''
                },
                _geoloc: {
                    lat: '',
                    lng: ''
                },
                images: [
                    'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
                    'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=81',
                    'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=82',
                    'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=83',
                    'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=84'
                ]
            }
        }
    },

    mounted() {
        this.$maps.makeAutoComplete(this.$refs.locationSelector, ['address'])
    },

    methods: {
        async onSubmit() {
            await fetch('/api/homes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.home)
            })
        },

        getAddressPart(parts, type) {
            return parts.find(part => part.types.includes(type))
        },

        changed(event) {
            const addressParts = event.detail.address_components
            const street = this.getAddressPart(addressParts, 'street_number')?.short_name || ''
            const route = this.getAddressPart(addressParts, 'route')?.short_name || ''

            this.home.location.address = street + ' ' + route
            this.home.location.city = this.getAddressPart(addressParts, 'locality')?.short_name || ''
            this.home.location.state = this.getAddressPart(addressParts, 'administrative_area_level_2')?.long_name || ''
            this.home.location.postalCode = this.getAddressPart(addressParts, 'postal_code')?.short_name || ''
            this.home.location.country = this.getAddressPart(addressParts, 'country')?.short_name || ''

            const geo = event.detail.geometry.location
            this.home._geoloc.lat = geo.lat()
            this.home._geoloc.lng = geo.lng()
        }
    }
}
</script>

<style lang="scss">
.form {
    input, textarea {
        @apply p-1 m-1 bg-gray-200;
    }
}
</style>
