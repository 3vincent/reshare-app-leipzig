<template>
  <div class="postComment">
    <form @submit="submitComment">
      <h3>Post Comment</h3>
      <label for="comment">
        <textarea v-model="comment" id="comment" type="text" placeholder="Your Comment" required="required" />
      </label>
      <input type="submit" value="Send Comment" />
      <p>
        You are logged in as <span class="bold">{{ user.name }}</span>
      </p>
    </form>
    <div v-if="backendError">{{ backendError }}</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'CommentPost',
  data() {
    return {
      comment: '',
      backendError: null,
    }
  },
  methods: {
    ...mapActions(['postComment']),
    async submitComment(e) {
      e.preventDefault()
      try {
        const payload = {
          offer: this.$route.params.id,
          comment: this.comment,
        }
        await this.postComment(payload)
        this.comment = ''
        // this.$router.push('/login')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<style lang="scss" scoped>
label {
  display: block;
  margin: 1rem 0;
}
textarea {
  width: 25rem;
  max-width: calc(100% - 3.4rem);
  height: 150px;
}
input {
  padding: 0.5rem;
  background-color: #82c8dd;
  border-radius: 0.28rem;
}
input:hover {
  background-color: #f1ba52;
  cursor: pointer;
}
</style>
