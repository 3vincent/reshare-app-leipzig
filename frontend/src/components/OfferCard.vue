<template>
  <div class="box container">
    <div class="photobox contentBox image">
      <img :src="offer.photos[0]" />
    </div>
    <div class="offerHeadline">
      <h2>{{ offer.title }}</h2>
      <span class="statusLight"></span>
      <div>
        <span class="tag bold"># {{ offer.category }}</span>
      </div>
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
      <p>
        <span class="bold">Owner: </span>
        <Button
          ><router-link :to="`/users/${offer.owner[0]._id}`">{{ offer.owner[0].name }}</router-link></Button
        >
      </p>
    </div>
    <div class="content-2">
      <p class="bold">Description:</p>
      <p>{{ offer.description }}</p>
      <span class="tag"
        ><small>UUID: {{ offer.offerUUID }}</small></span
      >
    </div>
    <div class="viewFoo">
      <p>
        <Button>Like</Button>&nbsp; <Button>Save</Button>&nbsp;
        <Button
          ><router-link :to="`/offers/${offer._id}`">{{ offer.title }}</router-link></Button
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OfferCard',
  props: ['offer'],
  data() {
    return {
      default: 'not defined',
    }
  },
}
</script>

<style scoped lang="scss">
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
    span.statusLight {
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
  .viewFoo {
    background-color: #7f909e;
    border-bottom-left-radius: 0.9rem;
    border-bottom-right-radius: 0.9rem;
    height: 100%;
    p {
      line-height: 0.25fr;
      padding-left: 1rem;
    }
  }
  .content-1,
  .content-2 {
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
  .viewFoo {
    background-color: #465058;
  }
}
</style>