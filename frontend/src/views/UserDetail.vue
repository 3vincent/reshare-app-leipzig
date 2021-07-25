<template>
  <div v-if="user">
    <div>
      <h1>Profile</h1>
      <router-link to="/"> <span class="bold back">&#9747; </span> </router-link>
    </div>
    <UserCard :user="user" :if="user"></UserCard>
    <Counter></Counter>
  </div>
</template>

<script>
import UserCard from '@/components/UserCard.vue'
import Counter from '@/components/Counter.vue'
import { mapActions } from 'vuex'

export default {
  name: 'UserDetail',
  components: { UserCard, Counter },
  data() {
    return {
      user: null,
    }
  },
  async created() {
    this.user = await this.fetchUser(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchUser']),
  },
}
</script>

<style lang="scss" scoped>
.back {
  position: absolute;
  left: 1rem;
  top: 1rem;
  font-size: 2.3rem;
  line-height: 3rem;
  height: 3rem;
  width: 3rem;
  border-radius: 5%;
  border: 1px solid lightslategray;
  background-color: #ffffff;
}
a:link,
a:visited {
  color: #000;
}
</style>
