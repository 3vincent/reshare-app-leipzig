<template>
  <div>
    <div class="container">
      <div class="comment">
        <!-- attention {{ comment.sender.name }} only works because of autopopulate -->
        <p class="bold">{{ comment.sender.name }}:</p>
        <p>{{ comment.comment }}</p>
        <p>{{ comment.creationTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CommentCard',
  props: {
    commentId: String,
  },
  data() {
    return {
      comment: null,
    }
  },
  async created() {
    this.comment = await this.fetchComment(this.commentId)
  },
  methods: {
    ...mapActions(['fetchComment']),
  },
}
</script>

<style scoped lang="scss">
// grid
.container {
  display: grid;
  grid-template-columns: 0.6fr 500px 0.6fr; //hacky!!!
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: '. comment .';
}
.comment {
  grid-area: comment;
}

// layout
.bold {
  font-weight: 600;
}
div.comment {
  background-color: rgb(212, 215, 228);
  border-radius: 1rem;
  margin-bottom: 2rem;
}
</style>
