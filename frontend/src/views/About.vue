<template>
  <div class="about">
    <NavBar></NavBar>
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'About',
  components: {
    NavBar,
  },
}
</script>
