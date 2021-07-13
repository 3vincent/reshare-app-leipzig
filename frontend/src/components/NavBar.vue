<template>
  <div id="nav">
    <ul>
      <router-link to="/"><li>Homepage</li></router-link>
      <router-link to="/profile"><li>Profile</li></router-link>
      <router-link v-if="!user" to="/login"><li>Login</li></router-link>
      <router-link v-if="!user" to="/register"><li>Register</li></router-link>
      <router-link to="/about"><li>About</li></router-link>
      <a v-if="user" @click="doLogout" href="#"><li>Logout</li></a>
      <a :href="`${backendPath}/api/users/initialize`"><li>Init Test Data to DB</li></a>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'NavBar',
  props: {},
  data() {
    return {
      backendPath: process.env.VUE_APP_BASE_URL ? process.env.VUE_APP_BASE_URL : '',
    }
  },
  methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/login')
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<style scoped lang="scss">
#nav {
  background-color: #ffffff;
  position: sticky;
  top: 0;
  padding: 0;
  z-index: 1000;
  ul {
    padding: 14px 0;
    margin: 0;
    list-style-type: none;
    display: table;
    a {
      text-decoration: none;
      font-weight: bold;
      color: rgb(226, 188, 139);
      &.router-link-exact-active {
        color: #42b983;
      }
    }
    li {
      text-align: center;
      display: inline-table;
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      margin: 10px;
      background-color: rgb(52, 81, 114);
    }
    li:hover {
      background-color: rgb(107, 85, 37);
    }
  }
}
@media (max-width: 660px) {
  #nav {
    position: relative;
    ul {
      display: block;
      margin: 0 auto;
      li {
        display: table;
        margin: 10px;
        width: calc(100% - 10px - 10px);
        padding: 0;
      }
    }
  }
}
</style>
