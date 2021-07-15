<template>
  <div>
    <div class="container">
      <div class="comment speech-bubble">
        <p>{{ comment.comment }}</p>
        <p class="small">
          <span class="bold">The Language in this comment is: </span> {{ comment.classification.tag_name }}
        </p>
        <p class="small bold">{{ comment.creationTime }}</p>
      </div>
      <div class="senderName">
        <span class="userAvatar" :style="{ backgroundImage: 'url(' + user.profilePhoto + ')' }"></span>
        <span class="bold">{{ user.name }}</span>
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
      user: null,
    }
  },
  async created() {
    this.comment = await this.fetchComment(this.commentId)
    this.user = await this.fetchUser(this.comment.sender)
  },
  methods: {
    ...mapActions(['fetchComment']),
    ...mapActions(['fetchUser']),
  },
}
</script>

<style scoped lang="scss">
// grid
.container {
  display: grid;
  grid-template-columns: 0.8fr 1.4fr 0.8fr; //hacky!!!
  grid-template-rows: 0.2fr 0.2fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    '. comment .'
    'senderName senderName senderName ';
}
@media (max-width: 600px) {
  .container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      'comment'
      'senderName';
  }
  .comment {
    margin: 0 10px;
  }
}

.comment {
  grid-area: comment;
}

// layout
.container {
  margin-bottom: 2rem;
}
.small {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 0.8rem;
  margin-top: 2rem;
  margin-bottom: 0;
}
.senderName {
  grid-area: senderName;
  margin: 1rem 0;
}
.comment {
  position: relative;
  background-color: rgb(212, 215, 228);
  margin-bottom: 2rem;
  padding: 1rem 0;
  font-size: 1.3rem;
}

.speech-bubble {
  position: relative;
  background: rgb(212, 215, 228);
  border-radius: 1rem;
  padding: 10px;
}

.speech-bubble:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: 33px solid transparent;
  border-top-color: rgb(212, 215, 228);
  border-bottom: 0;
  border-left: 0;
  margin-left: -16.5px;
  margin-bottom: -33px;
}

.userAvatar {
  display: inline-block;
  position: relative;
  margin: 0 10px;
  top: 5px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  box-shadow: 0px 0px 10px 1px rgb(150, 150, 150);
}
</style>
