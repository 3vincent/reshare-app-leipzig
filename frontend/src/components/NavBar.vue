<template>
  <div id="nav">
    <ul>
      <router-link to="/"><li>Homepage</li></router-link>
      <router-link to="/profile"><li>Profile</li></router-link>
      <router-link to="/about"><li>About</li></router-link>
      <a :href="`${backendPath}/api/users/initialize`"><li>👾 Init Test Data to DB👾</li></a>
      <router-link v-if="!user" to="/register" class="loginLogoutRegisterButton registerButton"
        ><li>Register</li></router-link
      >
      <router-link v-if="!user" to="/login" class="loginLogoutRegisterButton loginButton"><li>Login</li></router-link>
      <a v-if="user" @click="doLogout" href="#" class="loginLogoutRegisterButton logoutButton"><li>Logout</li></a>
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
  margin-bottom: 0;
  z-index: 1000;
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: table;
    a {
      text-decoration: none;
      font-weight: bold;
      color: #3d3c3a;
      &.router-link-exact-active > li {
        border-bottom: 2px solid rgb(228, 148, 0);
      }
    }
    .loginLogoutRegisterButton > li {
      padding: 0 20px;
      height: 40px;
      background-color: transparent;
      border: 1px solid rgb(52, 81, 114);
      color: rgb(52, 81, 114);
    }
    .loginButton:hover > li {
      background-color: rgba(13, 155, 20, 0.5);
      color: #fff;
      border: 1px solid transparent;
    }
    .registerButton:hover > li {
      background-color: rgba(8, 25, 177, 0.5);
      color: #fff;
      border: 1px solid transparent;
    }
    .logoutButton:hover > li {
      background-color: rgba(255, 0, 0, 0.5);
      color: #fff;
      border: 1px solid transparent;
    }
    li {
      border: 1px solid transparent;
      text-align: center;
      display: inline-block;
      box-sizing: border-box;
      padding: 10px 15px;
      height: 60px;
      line-height: 40px;
      margin: 0 10px;
    }
    li:hover {
      border-bottom: 2px solid orange;
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
