<template>
  <div class="register">
    <form @submit="submitLogin">
      <h1>Create a new account</h1>
      <label for="name"
        >Profile: (must be unique to you)&nbsp;
        <input v-model="name" id="name" type="text" placeholder="Your name" required="required" />
      </label>
      <label for="givenName"
        >Real Name: (optional)&nbsp;
        <input v-model="givenName" id="givenName" type="text" placeholder="Your real name" />
      </label>
      <label for="age"
        >Age:&nbsp;
        <input v-model="age" id="age" type="number" placeholder="Your age" required="required" />
      </label>
      <label for="email"
        >Email:&nbsp;
        <input v-model="email" id="email" type="email" placeholder="Your email" required="required" />
      </label>
      <label for="areaCode"
        >Area Code:&nbsp;
        <input v-model="areaCode" id="areaCode" type="areaCode" placeholder="Your Area Code" required="required" />
      </label>
      <label for="city"
        >City:&nbsp;
        <input v-model="city" id="city" type="city" placeholder="Your city" required="required" />
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
      city: 'Leipzig',
      areaCode: '',
      givenName: '',
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
          givenName: this.givenName,
          age: this.age,
          location: [this.city, this.areaCode],
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
