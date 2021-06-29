<template>
  <div>
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
