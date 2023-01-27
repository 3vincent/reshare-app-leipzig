<template>
  <div class="login">
    <h1>Log in to your account</h1>

    <form @submit="submitLogin">
      <label for="email"
        >Email:&nbsp;
        <input v-model="email" id="email" type="email" placeholder="Your email" required="required" />
      </label>

      <label for="password"
        >Password:&nbsp;
        <input v-model="password" id="password" type="password" placeholder="Your password" required="required" />
      </label>

      <input type="submit" value="Log in" />
    </form>

    <div v-if="backendError">
      <span>{{ backendError }}</span>
    </div>

    <div><span>Don't have an account yet?</span> <router-link to="/register">Register</router-link></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      backendError: null,
    }
  },
  methods: {
    ...mapActions(['login']),
    async submitLogin(e) {
      e.preventDefault()

      try {
        await this.login({
          email: this.email,
          password: this.password,
        })

        this.$router.push('/profile')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  label {
    text-align: right;
    margin: 0;
  }

  input {
    height: 2rem;
    min-width: 200px;
  }
}
</style>
