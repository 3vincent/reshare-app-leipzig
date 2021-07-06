<template>
  <div v-if="!offer">Loading Offer...</div>
  <div v-else>
    <div class="box container">
      <div class="photobox image">
        <img :src="offer.photos[0]" />
      </div>
      <div class="offerHeadline">
        <h2>{{ offer.title }}</h2>
        <span class="statusLight" :style="cssProps"></span>
      </div>
      <div class="tagLine">
        <span class="tag bold"># {{ offer.category }}</span>
      </div>
      <div class="content-1">
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
        <p><span class="bold">Creation Time: </span>{{ offer.creationTime }}</p>
        <p>
          <span class="bold">Owner: </span>
          <Button
            ><router-link :to="`/users/${offer.owner._id}`">{{ offer.owner.name }}</router-link></Button
          >
        </p>
        <p>
          <span class="bold">Liked by: </span>{{ offer.likedBy.length }}
          <span v-if="offer.likedBy.length > 1">People</span><span v-else>Person</span>
        </p>
        <p><span class="bold">Number of comments: </span>{{ offer.comments.length }}</p>
      </div>
      <div class="content-2">
        <p><span class="bold">Description:</span></p>
        <p>{{ offer.description }}</p>
        <span class="tag"
          ><small>UUID: {{ offer.offerUUID }}</small></span
        >
      </div>
      <div class="viewFooter">
        <p>
          <Button @click="userLikeOffer">Like</Button>
          <Button>Save</Button>
          <router-link :to="`/offers/${offer._id}`"
            ><Button>{{ offer.title }}</Button></router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'OfferCard',
  props: {
    offerId: String,
  },
  data() {
    return {
      offer: null,
      offerAvailableColor: '#337B24',
      offerReservedColor: '#F99D41',
      offerExpiredColor: 'red',
    }
  },
  async created() {
    this.offer = await this.fetchOffer(this.offerId)
  },
  methods: {
    ...mapActions(['fetchOffer']),
    ...mapActions(['likeOffer']),
    async userLikeOffer(e) {
      e.preventDefault()
      try {
        await this.likeOffer(this.offerId)
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
  computed: {
    cssProps() {
      if (this.offer.status == 'open')
        return {
          '--availability-status-color': this.offerAvailableColor,
        }
      else if (this.offer.status == 'reserved') {
        return {
          '--availability-status-color': this.offerReservedColor,
        }
      } else {
        return {
          '--availability-status-color': this.offerExpiredColor,
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  margin: 12px;
  display: grid;
  grid-template-columns: calc(120px + 2rem) 1.3fr 1.3fr;
  grid-template-rows: 0.25fr 0.25fr 0.5fr 60px;
  gap: 0rem 0rem;
  grid-auto-flow: row;
  grid-template-areas:
    'image offerHeadline offerHeadline'
    'image tagLine tagLine'
    'image content-1 content-2'
    'viewFooter viewFooter viewFooter';
  margin-bottom: 1rem;
}

@media (max-width: 600px) {
  .container {
    grid-template-columns: calc(120px + 2rem) 1fr;
    grid-template-rows: 0.25fr 0.25fr 0.5fr 1fr 60px;
    grid-template-areas:
      'offerHeadline offerHeadline'
      'image tagLine'
      'content-1 content-1'
      'content-2 content-2'
      'viewFooter viewFooter';
  }
}

.image {
  grid-area: image;
}

.offerHeadline {
  grid-area: offerHeadline;
}

.tagLine {
  grid-area: tagLine;
}

.content-1 {
  grid-area: content-1;
}
.content-2 {
  grid-area: content-2;
}

.viewFooter {
  grid-area: viewFooter;
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
    span.statusLight {
      // street lights
      // for status: open | reserved | taken
      position: absolute;
      border-radius: 50%;
      right: 0.3rem;
      top: 0.2rem;
      width: 2.5rem;
      height: 2.5rem;
      display: inline-block;
      background-color: var(--availability-status-color);
    }
  }
  background-color: white;
  border: 1px solid rgb(179, 179, 179);
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
  .viewFooter {
    background-color: #7f909e;
    border-bottom-left-radius: 0.9rem;
    border-bottom-right-radius: 0.9rem;
    margin: 0;
    p {
      line-height: 60px;
      margin: 0;
      padding-left: 1rem;
    }
  }
  .content-1,
  .content-2,
  .tagLine,
  .offerHeadline {
    padding: 10px;
  }
}
span.tag {
  background-color: #ffffff;
  color: #2c3e50;
  font-size: 0.7rem;
  border: 1px solid #2c3e50;
  padding: 2px 4px;
  border-radius: 3px;
}
.box:hover {
  border: 1px solid transparent;
  background-color: #dddddd; // yello #e4b20d; and grey #465058; well together
  color: rgb(100, 100, 100);
  .viewFooter {
    background-color: #465058;
  }
}
</style>
