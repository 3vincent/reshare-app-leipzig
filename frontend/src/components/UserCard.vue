<template>
  <div>
    <div>
      <div class="userAvatar" :style="{ backgroundImage: 'url(' + user.profilePhoto + ')' }"></div>
      <h1>{{ user.givenName }}</h1>
      <p><span class="bold">Username: </span>{{ user.name }}</p>
      <p><span class="bold">Age: </span>{{ user.age }}</p>
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
      <div>
        <h2 class="bold">{{ user.givenName }}'s Offers</h2>
        <div v-for="offer in user.offers" v-bind:key="offer._id + '-label'">
          <OfferCard :offer="offer" v-if="offer"></OfferCard>
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
.bold {
  font-weight: 600;
}
.userAvatar {
  margin: 0 auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  box-shadow: 4px 2px 30px 3px rgb(150, 150, 150);
}
</style>
