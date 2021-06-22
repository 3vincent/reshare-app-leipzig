<template>
  <div>
    <div>
      <h1 v-if="offer">{{ offer.title }}</h1>
      <h1 v-else>Loading...</h1>
      <router-link to="/"> <span class="bold back">&#9747; </span> </router-link>
    </div>
    <Offer :offer="offer" :if="offer"></Offer>
  </div>
</template>

<script>
import axios from 'axios'
import Offer from '@/components/Offer.vue'

export default {
  name: 'Offer Detail',
  components: { Offer },
  data() {
    return {
      offer: null,
    }
  },
  async created() {
    const offerRequest = await axios.get(`/api/offers/${this.$route.params.id}`)
    this.offer = offerRequest.data
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
