<template>
  <div class="about">
    <NavBar></NavBar>
    <div class="container">
      <h1>About Leipzig Share App</h1>
      <p>
        This App is made as an <span class="bold">Example Project</span> while attending
        <a href="https://www.coyotiv.com/school-of-software-engineering/" target="_blank"
          >Coyotiv School Of Software Engineering</a
        >.
      </p>
      <p>
        This project is open Source! It is published under the MIT License. View the complete source code in my
        <a href="https://github.com/3vincent/reshare-app-leipzig" target="_blank">github profile</a>.
      </p>
      <p>
        The purpose of this App is to free 'sharing is caring'-groups out of social media sites like facebook or
        networks like Telegram.
      </p>
      <p>
        <span class="bold">Important: </span>This App is just a demo. Do not upload real content. Please use the demo
        users to log in or create your own demo user :)
      </p>
      <p>This demo only works correctly in Google Chrome :(</p>
      <h2>'Thank you' notes go out to:</h2>
      <ul>
        <li>
          <span class="bold">Default Image for Offer List Views: </span>
          <ul>
            <li>
              CC License Image, source:
              <a href="https://commons.wikimedia.org/wiki/File:Placeholder_view_vector.svg" target="_blank"
                >https://commons.wikimedia.org/wiki/File:Placeholder_view_vector.svg</a
              >
              by
              <a href="https://commons.wikimedia.org/wiki/User:Flanoz" target="_blank"
                >https://commons.wikimedia.org/wiki/User:Flanoz</a
              >
            </li>
          </ul>
        </li>
        <li>
          <span class="bold">List Views Header Image </span>
          <ul>
            <li>
              unsplash, Steven Kamenar @skamenar:
              <a href="https://unsplash.com/photos/MMJx78V7xS8" target="_blank"
                >https://unsplash.com/photos/MMJx78V7xS8</a
              >
            </li>
          </ul>
        </li>
        <li>
          <span class="bold">Sentiment Text Analysis by Monkeylearn: </span>
          <ul>
            <li>
              <a href="https://app.monkeylearn.com/" target="_blank">https://app.monkeylearn.com/</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <h2>Reset Database</h2>
    <button>
      <a :href="`${backendPath}/api/users/initialize`">👾 Init Test Data to DB👾</a>
    </button>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'About',
  components: {
    NavBar,
  },
  data() {
    return {
      backendPath: process.env.VUE_APP_BASE_URL ? process.env.VUE_APP_BASE_URL : '',
    }
  },
}
</script>
<style scoped lang="scss">
.container {
  margin: 0 auto;
  width: 90vw;
  max-width: 800px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
h1,
h2,
h3,
h4,
h5 {
  padding-top: 2vh;
}
p {
  text-align: left;
}
ul {
  text-align: left;
  list-style-position: inside;
  max-width: 100%;
}
li {
  padding-bottom: 1rem;
}
a:link,
a:visited {
  color: #4fa477;
  text-decoration: none;
  border-bottom: 1px solid grey;
  &:hover {
    border-bottom: 1px solid #a4774f;
  }
}

button {
  height: 3rem;
  min-width: 14rem;
}

button a:link {
  text-decoration: none;
  border: none;

  &:hover {
    border: none;
  }
}
</style>
