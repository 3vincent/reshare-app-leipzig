<template>
  <div class="container">
    <div class="userProfileContainer">
      <div class="userAvatarContainer">
        <div class="userAvatar" :style="{ backgroundImage: 'url(' + user.profilePhoto + ')' }"></div>
      </div>
      <h1>{{ user.givenName }}</h1>
      <p><span class="bold">Username: </span>{{ user.name }}</p>
      <p v-if="user.age != null"><span class="bold">Age: </span>{{ user.age }}</p>
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
      <div v-if="user.offers.length">
        <h2 class="bold">{{ user.givenName }}'s Offers</h2>
        <div v-for="offer in user.offers.slice().reverse()" v-bind:key="offer._id + '-label'">
          <OfferCard :offerId="offer._id" v-if="offer"></OfferCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OfferCard from '@/components/OfferCard.vue'

export default {
  name: 'UserCard',
  components: {
    OfferCard,
  },
  props: ['user'],
  data() {
    return {
      default: 'not defined',
    }
  },
}
</script>

<style scoped lang="scss">
.userAvatarContainer {
  margin: 0 auto;
  border-radius: 50%;
  padding: 7px;
  // User Updates Marker-ig
  // padding: 3px;
  // border: 4px solid blue;
  width: 100px;
  height: 100px;
}
.userAvatar {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 4px 2px 30px 3px rgb(150, 150, 150);
}
</style>
