<template>
  <div id="app">
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src

import Footer from '@/components/Footer.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Footer,
  },
  async created() {
    console.log('here[[[[[[[[[++++++++++++++: ', (await axios.get('/api/account/session')).data)
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
