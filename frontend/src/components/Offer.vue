<template>
  <div class="box container">
    <div class="photobox contentBox image">
      <img :src="offer.photos" />
    </div>
    <div class="offerHeadline">
      <h2>{{ offer.title }}</h2>
      <span></span>
    </div>
    <div class="content-1">
      <p><span class="bold">Status: </span>{{ offer.status }}</p>
      <p>
        <span class="bold">Location: </span
        >{{
          offer.location
            .map(point => point)
            .slice()
            .reverse()
            .join(' ')
        }}
      </p>
      <p><span class="bold">Category: </span>{{ offer.category }}</p>
      <p><span class="bold">Creation Time: </span>{{ offer.creationTime }}</p>
      <p><span class="bold">Owner: </span>{{ offer.owner[0].name }}</p>
    </div>
    <div class="content-2">
      <p class="bold">Description:</p>
      <p>{{ offer.description }}</p>
    </div>
    <div class="viewFoo">
      <p><span>Like</span> <span>|</span> <span>Save</span> <span>|</span></p>
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
div {
  // border: 1px solid red;
}
.container {
  margin: 12px;
  display: grid;
  grid-template-columns: calc(120px + 2rem) 1.3fr 1.3fr;
  grid-template-rows: 0.25fr 0.5fr 0.25fr;
  gap: 0rem 0rem;
  grid-auto-flow: row;
  grid-template-areas:
    'image offerHeadline offerHeadline'
    'image content-1 content-2'
    'viewFoo viewFoo viewFoo';
  margin-bottom: 1rem;
}

@media (max-width: 600px) {
  .container {
    grid-template-columns: calc(120px + 2rem) 1fr;
    grid-template-areas:
      'image offerHeadline '
      'content-1 content-1'
      'content-2 content-2'
      'viewFoo viewFoo';
  }
}

.image {
  grid-area: image;
}

.offerHeadline {
  grid-area: offerHeadline;
}

.content-1 {
  grid-area: content-1;
}
.content-2 {
  grid-area: content-2;
}

.viewFoo {
  grid-area: viewFoo;
}

.bold {
  font-weight: 600;
}
.box {
  .offerHeadline {
    position: relative;
    h2 {
      margin-top: 1rem;
      display: inline-block;
    }
    span {
      // street lights
      // for status: open | reserved | taken
      position: absolute;
      right: 0.4rem;
      top: 0.2rem;
      width: 20px;
      height: 20px;
      display: inline-block;
      // background-image: url('../assets/logo.png');
      // background-size: 50px 50px;
      // background-repeat: no-repeat;
      background-color: green;
      border-radius: 50%;
    }
  }
  background-color: white;
  border: 1px solid green;
  border-radius: 1rem;
  text-align: left;
  .photobox {
    margin: 0 auto;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    height: 120px;
    width: 120px;
    img {
      display: block;
      margin: auto;
      max-height: 100px;
      max-width: 100px;
    }
  }
  .viewFoo {
    background-color: #7f909e;
    border-bottom-left-radius: 0.9rem;
    border-bottom-right-radius: 0.9rem;
    height: 100%;
    line-height: 100%;
    p {
      padding-left: 1rem;
    }
  }
}
.box:hover {
  border: 1px solid transparent;
  background-color: #c4c4c4; // #e4b20d;
  color: white;
  .viewFoo {
    background-color: #465058;
  }
}
</style>
