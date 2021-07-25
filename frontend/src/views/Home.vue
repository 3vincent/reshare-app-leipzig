<template>
  <div class="home">
    <header>
      <h1>RESHARE APP LEIPZIG</h1>
    </header>
    <NavBar></NavBar>
    <div v-for="offer in offers.slice().reverse()" v-bind:key="offer._id + '-label'">
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
header {
  background-image: url('/img/backgrounds/header_hero.jpg');
  background-size: cover;
  padding: 4rem;

  h1 {
    display: block;
    font-size: 4.5rem;
    line-height: 4.5rem;
    text-align: left;
    color: rgba(0, 0, 0, 0.8);
    margin: 0;
    padding: 0;
  }
}
</style>
