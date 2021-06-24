<template>
  <div class="home">
    <h1>LEIPZIG SHARE APP</h1>
    <NavBar></NavBar>

    <!-- User List Preview -->
    <div v-for="user in users" :key="user.name + '-label'">{{ user.name }}, {{ user.age }}</div>
    <div v-for="user in users" :key="user.location + '-label'">
      {{ user.name }} lives in {{ user.location[1] }} {{ user.location[0] }}
    </div>

    <div v-for="offer in offers" v-bind:key="offer._id + '-label'">
      <p>DIE ID: {{ offer._id }}</p>
      <OfferCard :offer="offer" v-if="offer"></OfferCard>
      <router-link :to="`/offers/${offer._id}`">
        <Button v-if="offer"> <span class="bold">Open Offer2:</span> {{ offer.title }} </Button>
      </router-link>
    </div>
    <Counter></Counter>
  </div>
</template>

<script>
// @ is an alias to /src
import OfferCard from '@/components/OfferCard.vue'
import NavBar from '@/components/NavBar.vue'
import Counter from '@/components/Counter.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    OfferCard,
    NavBar,
    Counter,
  },
  data() {
    return {
      offers: [],
      users: [],
    }
  },
  async created() {
    this.users = await this.fetchUsers()
    this.offers = await this.fetchOffers()
  },
  methods: {
    ...mapActions(['fetchOffers', 'fetchUsers']),
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
