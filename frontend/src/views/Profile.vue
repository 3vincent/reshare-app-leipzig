<template>
  <div class="home">
    <NavBar></NavBar>
    <h1 v-if="user.givenName">Leipzig Share App - Hello {{ user.givenName }}</h1>
    <h1 v-else>Leipzig Share App - Hello {{ user.name }}</h1>
    <h3>This is your user Profile:</h3>
    <UserCard :user="user" :if="user"></UserCard>
    <div v-for="liked in user.likes" v-bind:key="liked + '-label'">
      <p>Offers I liked: {{ liked }}</p>
    </div>
    <h3>Users on our Platform</h3>
    <div v-for="user in users" v-bind:key="user">
      <router-link :to="`/users/${user._id}`">{{ user.name }}</router-link>
    </div>
    <div v-if="liveStreams.length">
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
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import UserCard from '@/components/UserCard.vue'
// import Counter from '@/components/Counter.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Profile',
  components: {
    // Counter,
    NavBar,
    UserCard,
  },
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
    ...mapActions(['fetchUsers', 'goLive', 'sendMessageToLiveStream', 'joinStream']),
    sendMessage(e) {
      e.preventDefault()
      this.sendMessageToLiveStream(this.message)
      this.message = ''
    },
  },
  computed: {
    ...mapState(['currentLiveStream', 'liveStreams', 'user', 'liveStreamMessages']),
  },
}
</script>
