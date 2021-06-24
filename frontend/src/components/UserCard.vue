<template>
  <div>
    <div>
      <h1 v-if="user">{{ user.name }}</h1>
      <h1 v-else>Loading Profile Page...</h1>
    </div>
    <div>
      <p>
        <span class="bold">Location: </span
        >{{
          user.location
            .map(point => point)
            .slice()
            .reverse()
            .join(' ')
        }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: ['user'],
  data() {
    return {
      default: 'not defined',
    }
  },
}
</script>

<style scoped lang="scss"></style>
