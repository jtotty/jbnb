<template>
    <div>
        <div v-for="home in homes" :key="home.objectID" style="float:left;margin:10px">
            <NuxtLink :to="`/home/${home.objectID}`">
                <HomeCard :home="home" />
            </NuxtLink>
        </div>
    </div>
</template>

<script>
import homes from '~/data/homes'

export default {
    name: 'HomePage',

    data() {
        return {
            homes: homes.slice(0, 3)
        }
    },

    head() {
        return {
            title: 'Homepage',
            meta: [{
                name: 'description',
                content: 'The best place to stay in the world!',
                hid: 'description'
            }]
        }
    }
}
</script>
