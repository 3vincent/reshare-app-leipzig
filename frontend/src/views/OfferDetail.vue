<template>
  <div>
    <div>
      <h1 v-if="offer">{{ offer.title }}</h1>
      <h1 v-else>Loading Offer Page...</h1>
      <router-link to="/"> <span class="bold back">&#9747; </span> </router-link>
    </div>
    <Offer :offer="offer" :if="offer"></Offer>
    <Counter></Counter>
  </div>
</template>

<script>
import Offer from '@/components/Offer.vue'
import Counter from '@/components/Counter.vue'
import { mapActions } from 'vuex'

export default {
  name: 'OfferDetail',
  components: {
    Offer,
    Counter,
  },
  data() {
    return {
      offer: null,
    }
  },
  async created() {
    this.offer = await this.fetchOffer(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchOffer']),
  },
}
</script>

<style lang="scss" scoped>
.bold {
  font-weight: 600;
}
.back {
  position: absolute;
  left: 1rem;
  top: 1rem;
  font-size: 2rem;
}
</style>
