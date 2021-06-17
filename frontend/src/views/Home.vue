<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js åpp" />
    <div v-for="user in users" :key="user.name">{{ user.name }}, {{ user.age }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      users: [],
    }
  },
  async created() {
    const usersRequest = await axios.get('/api/users')

    this.users = usersRequest.data
  },
}
</script>
