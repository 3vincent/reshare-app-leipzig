<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js åpp" /> -->
    <div v-for="offer in offers" v-bind:key="offer">
      <Offer :offer="offer" v-if="offer"></Offer>
    </div>

    <div v-for="user in users" :key="user.name">{{ user.name }}, {{ user.age }}</div>
    <div v-for="user in users" :key="user.location">
      {{ user.name }} lives in {{ user.location[1] }} {{ user.location[0] }}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Offer from '@/components/Offer.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Offer,
  },
  data() {
    return {
      users: [],
      offers: [],
    }
  },
  async created() {
    const usersRequest = await axios.get('/api/users')
    this.users = usersRequest.data
    const offersRequest = await axios.get('/api/offers')
    this.offers = offersRequest.data
  },
}
</script>
