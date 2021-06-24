<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Counter',
  mounted() {
    this.incrementCount()
  },
  methods: {
    ...mapActions(['incrementCount']),
  },
  computed: {
    ...mapState(['count']),
  },
}
</script>

<template>
  <div>
    <p>Pages I've visited: {{ count }}</p>
  </div>
</template>
