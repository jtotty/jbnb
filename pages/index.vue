<template>
  <div>
    <div v-for="home in homes" :key="home.objectID" style="float:left;margin:10px">
      <HomeCard :home="home" />
    </div>
  </div>
</template>

<script>
import homes from '~/data/homes'

export default {
  name: 'IndexPage',

  data () {
    return {
      homes: homes.slice(0, 3)
    }
  },

  head () {
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
