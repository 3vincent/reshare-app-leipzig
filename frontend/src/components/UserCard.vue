<template>
  <div>
    <div>
      <h2>fw {{ user.name }}</h2>
      <h1>This is the user:5</h1>
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
