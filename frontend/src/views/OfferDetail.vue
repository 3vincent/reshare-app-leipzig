<template>
  <div>
    <div>
      <h1 v-if="offer">{{ offer.title }}</h1>
      <h1 v-else>Loading Offer Page...</h1>
      <router-link to="/"> <span class="bold back">&#9747; </span> </router-link>
    </div>
    <OfferCard :offer="offer" :if="offer"></OfferCard>
    <h2>Comments</h2>
    <div v-for="comment in offer.comments" v-bind:key="comment._id + '-label'">
      <CommentCard :commentId="comment._id" v-if="comment"></CommentCard>
    </div>
    <Counter></Counter>
  </div>
</template>

<script>
import OfferCard from '@/components/OfferCard.vue'
import CommentCard from '@/components/CommentCard.vue'
import Counter from '@/components/Counter.vue'
import { mapActions } from 'vuex'

export default {
  name: 'OfferDetail',
  components: {
    OfferCard,
    CommentCard,
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
