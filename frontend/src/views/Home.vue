<template>
  <div class="home">
    <h1>LEIPZIG SHARE APP</h1>
    <NavBar></NavBar>
    <div v-for="offer in offers" v-bind:key="offer._id">
      <Offer :offer="offer" v-if="offer"></Offer>
      <router-link :to="'/offers/' + offer._id">
        <Button v-if="offer"> <span class="bold">Open Offer2:</span> {{ offer.title }} </Button>
      </router-link>
    </div>

    <!-- <div v-for="user in users" :key="user.name">{{ user.name }}, {{ user.age }}</div> -->
    <!-- <div v-for="user in users" :key="user.location">
      {{ user.name }} lives in {{ user.location[1] }} {{ user.location[0] }}
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Offer from '@/components/Offer.vue'
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Offer,
    NavBar,
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
    this.offers = await this.fetchOffers()
  },
  methods: {
    ...mapActions(['fetchOffers']),
  },
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 4rem;
  text-align: left;
}
.bold {
  font-weight: 600;
}
</style>
