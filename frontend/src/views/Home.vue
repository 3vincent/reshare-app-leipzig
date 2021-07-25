<template>
  <div class="home">
    <h1>LEIPZIG SHARE APP</h1>
    <NavBar></NavBar>
    <div v-for="offer in offers" v-bind:key="offer._id + '-label'">
      <OfferCard :offerId="offer._id" v-if="offer"></OfferCard>
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
</style>
