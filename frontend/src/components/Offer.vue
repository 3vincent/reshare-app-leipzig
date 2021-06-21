<template>
  <div class="box">
    <div class="photobox contentBox">
      <img :src="offer.photos" />
    </div>
    <div class="contentBox">
      <h2>{{ offer.title }}</h2>
      <p><span class="bold">Status: </span>{{ offer.status }}</p>
      <p class="bold">Description:</p>
      <p>{{ offer.description }}</p>
      <p><span class="bold">Owner: </span>{{ offer.owner[0].name }}</p>
    </div>
    <div class="contentBox">
      <p>Helllo</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Offer',
  props: ['offer'],
  data() {
    return {
      default: 'not defined',
    }
  },
  async created() {
    const offersRequest = await axios.get('/api/offers')
    this.offers = offersRequest.data
  },
}
</script>

<style scoped lang="scss">
.bold {
  font-weight: 600;
}
.box {
  background-color: white;
  border: 1px solid green;
  display: flex;
  overflow: auto;
  border-radius: 1rem;
  margin: 22px;
  text-align: left;
  .contentBox {
    float: left;
    max-width: 33%;
    margin: 10px 24px;
    h2 {
      margin-top: 0;
    }
  }
  .photobox {
    display: flex;
    overflow: auto;
    position: relative;
    background: #f0f0f0;
    border-radius: 0.3rem;
    height: 120px;
    width: 120px;
    img {
      display: block;
      margin: auto;
      max-height: 100px;
      max-width: 100px;
    }
  }
}
</style>
