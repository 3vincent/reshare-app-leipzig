<template>
  <div id="app">
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer,
  },
}
</script>

<style lang="scss">
// important: this is not scoped....
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3d3c3a;
}
.bold {
  font-weight: 600;
}
.backButton {
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
  & {
    color: #000;
  }
}
</style>
