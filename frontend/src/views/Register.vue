<template>
  <div class="register">
    <form @submit="submitLogin">
      <h1>Create a new account</h1>
      <label for="name"
        >Name:&nbsp;
        <input v-model="name" id="name" type="text" placeholder="Your name" required="required" />
      </label>
      <label for="age"
        >Age:&nbsp;
        <input v-model="age" id="age" type="number" placeholder="Your age" required="required" />
      </label>
      <label for="email"
        >Email:&nbsp;
        <input v-model="email" id="email" type="email" placeholder="Your email" required="required" />
      </label>
      <label for="password"
        >Password:&nbsp;
        <input v-model="password" id="password" type="password" placeholder="Your password" required="required" />
      </label>
      <input type="submit" value="Register" />
    </form>
    <div v-if="backendError">{{ backendError }}</div>
    <div>Already have an account? <router-link to="/login">Log in</router-link></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'register',
  data() {
    return {
      name: '',
      age: null,
      email: '',
      password: '',

      backendError: null,
    }
  },
  methods: {
    ...mapActions(['register']),
    async submitLogin(e) {
      e.preventDefault()

      try {
        await this.register({
          name: this.name,
          age: this.age,
          email: this.email,
          password: this.password,
        })

        this.$router.push('/login')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
}
</script>

<style lang="scss" scoped>
label {
  display: block;
  margin: 1rem 0;
}
</style>
