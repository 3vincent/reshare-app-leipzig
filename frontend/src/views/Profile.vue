<script>
import NavBar from '@/components/NavBar.vue'
import Counter from '@/components/Counter.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Profile',
  components: { Counter, NavBar },
  data() {
    return {
      users: [],
      time: new Date(),
      message: '',
    }
  },
  async created() {
    this.users = await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers']),
    // ...mapActions(['fetchUsers', 'goLive', 'sendMessageToLiveStream', 'joinStream']),
    // sendMessage(e) {
    //   e.preventDefault()
    //   this.sendMessageToLiveStream(this.message)
    //   this.message = ''
    // }
  },
  computed: {
    // ...mapState(['currentLiveStream', 'liveStreams', 'user', 'liveStreamMessages']),
    ...mapState(['user']),
  },
}
</script>

<template>
  <div class="home">
    <NavBar></NavBar>
    <h1>{{ user.name }}</h1>
    <h2>Leipzig Sharing ::: My User Profile</h2>
    <h2>Users</h2>
    <div v-for="user in users" v-bind:key="user">
      <router-link :to="`/users/${user._id}`">{{ user.name }}</router-link>
    </div>
    <!-- <div v-if="liveStreams.length">
      <h2>Live streams</h2>
      <div v-for="stream in liveStreams" v-bind:key="stream">
        <p>{{ stream }}</p>
        <button @click="joinStream(stream)">Join stream</button>
      </div>
    </div>
    <button @click="goLive">Go live</button>
    <div v-if="currentLiveStream">
      <h3>Live stream</h3>
      <div class="messages">
        <div class="message" v-for="message in liveStreamMessages" v-bind:key="message">
          <p>
            <span>{{ message.author }}:&nbsp;</span><span>{{ message.body }}</span>
          </p>
        </div>
      </div>
      <form @submit="sendMessage">
        <input type="text" v-model="message" /><input type="submit" value="Send message" />
      </form>
    </div> -->
  </div>
</template>
