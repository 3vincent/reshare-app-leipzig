<template>
  <div v-if="!offer">Loading Offer...</div>
  <div v-else>
    <div class="box container">
      <div class="photobox image">
        <router-link :to="`/offers/${offer._id}`"><img :src="offer.photos[0]" /></router-link>
      </div>
      <div class="offerHeadline">
        <router-link :to="`/offers/${offer._id}`"
          ><h2>{{ offer.title }}</h2></router-link
        >
        <span class="statusLight" :style="cssProps"></span>
      </div>
      <div class="tagLine">
        <span class="tag bold"># {{ offer.category }}</span>
      </div>
      <div class="content-1">
        <p><span class="bold">Description:</span></p>
        <p>{{ offer.description }}</p>
      </div>
      <div class="content-2">
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
          <router-link :to="`/users/${offer.owner._id}`"
            ><Button>{{ offer.owner.name }}</Button></router-link
          >
        </p>
        <p>
          <span class="bold">Liked by: </span>{{ offer.likedBy.length }}
          <span v-if="offer.likedBy.length > 1">People</span><span v-else>Person</span>
        </p>
        <p><span class="bold">Number of comments: </span>{{ offer.comments.length }}</p>
        <span class="tag"
          ><small>UUID: {{ offer.offerUUID }}</small></span
        >
      </div>
      <div class="viewFooter">
        <p>
          <Button @click="userLikeOffer">Like</Button>
          <Button>Save</Button>
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
      offerAvailableColor: '#7CA44F',
      offerReservedColor: '#A49B4F',
      offerExpiredColor: '#A4524F',
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

.box {
  .offerHeadline {
    position: relative;
    a {
      display: flex;
      padding: 0;
      margin: 0;
      border-bottom: 1px solid #b9c8d4;
    }
    h2 {
      margin-top: 1rem;
      margin-bottom: 0;
      display: block;
      padding-bottom: 0.5rem;
      text-decoration: none;
    }
    a:hover > h2 {
      border-bottom: 2px solid #b9c8d4;
      padding-bottom: calc(0.5rem - 2px);
    }
    span.statusLight {
      // street lights
      // for status: open | reserved | taken
      position: absolute;
      border-radius: 50%;
      right: 10px;
      top: 10px;
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
    background-color: #4f7ca4;
    box-shadow: inset 0px 1px 6px 0px rgb(80, 80, 80);
    border-bottom-left-radius: 0.9rem;
    border-bottom-right-radius: 0.9rem;
    margin: 0;
    p {
      line-height: 60px;
      margin: 0;
      padding-left: 1rem;
    }
    button {
      margin-right: 0.75rem;
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
  background-color: #7f909e17;
  color: #2c3e50;
  font-size: 0.7rem;
  border: 1px solid #2c3e50;
  padding: 2px 4px;
  border-radius: 3px;
}
.box:hover {
  border: 1px solid #a4774f;
  .viewFooter {
    background-color: #283e52;
  }
}
button:hover {
  cursor: pointer;
}
a:link,
a:visited {
  color: inherit;
  text-decoration: none;
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
  .box {
    .offerHeadline {
      span.statusLight {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>
