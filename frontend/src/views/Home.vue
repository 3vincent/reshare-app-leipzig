<template>
  <div class="home">
    <header>
      <h1>RESHARE APP LEIPZIG</h1>
    </header>
    <NavBar></NavBar>
    <div v-if="user">
      <AddOfferButton></AddOfferButton>
    </div>
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
import AddOfferButton from '@/components/AddOfferButton.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    OfferCard,
    NavBar,
    Counter,
    AddOfferButton,
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
  computed: {
    ...mapState(['user']),
  },
}
</script>

<style scoped lang="scss">
header {
  background-image: url('/img/backgrounds/header_hero.jpg');
  background-size: cover;
  height: 30vh;
  max-height: 250px;
  h1 {
    display: block;
    font-size: 4.5rem;
    line-height: 4.5rem;
    padding: 4rem;
    margin: 0 auto;
    text-align: left;
    color: #a4774fce;
  }
  @media (max-width: 700px) {
    h1 {
      font-size: 2rem;
      line-height: 2rem;
    }
  }
}
</style>
