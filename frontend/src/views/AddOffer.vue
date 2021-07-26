<template>
  <div>
    <router-link to="/"> <span class="bold backButton">&#9747; </span> </router-link>
    <h1>Add new Offer</h1>
    <div class="container">
      <form @submit="submitOffer">
        <div class="offerTitle">
          <label for="name"
            >Offer Title: &nbsp;
            <input
              v-model="offerTitle"
              id="offerTitle"
              type="text"
              placeholder="e.g. My old vacuum cleaner"
              required="required"
            />
          </label>
        </div>
        <div class="category">
          <label for="category"
            >Choose the category: &nbsp;
            <select id="category" name="category" v-model="category">
              <option value="Services">Services</option>
              <option value="Electrical Devices">Electrical Devices</option>
              <option value="Clothing">Clothing</option>
              <option value="something else" selected>something else</option>
            </select>
          </label>
        </div>
        <div class="locationCity">
          <label for="locationCity"
            >City:&nbsp;
            <input v-model="locationCity" id="locationCity" type="text" placeholder="Leipzig" required="required" />
          </label>
        </div>
        <div class="locationZipCode">
          <label for="locationZipCode"
            >Zip Code:&nbsp;
            <input v-model="locationZipCode" id="locationZipCode" type="text" placeholder="04102" required="required" />
          </label>
        </div>
        <div class="description">
          <label for="description"
            >Description: &nbsp;
            <textarea
              v-model="description"
              id="description"
              type="text"
              placeholder="Descripe your offer"
              required="required"
            />
          </label>
        </div>
        <div class="submit">
          <input class="submitButton bold" type="submit" value="Create Offer" />
        </div>
      </form>
    </div>
    <div v-if="backendError">{{ backendError }}</div>
    <div>Something went wront creating your new offer</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddOffer',
  data() {
    return {
      offerTitle: '',
      category: 'something else',
      locationCity: 'Leipzig',
      locationZipCode: '',
      description: '',
      backendError: null,
    }
  },
  methods: {
    ...mapActions(['postOffer']),
    async submitOffer(e) {
      e.preventDefault()
      try {
        const payload = {
          title: this.offerTitle,
          category: this.category,
          description: this.description,
          location: [this.locationCity, this.locationZipCode],
        }
        await this.postOffer(payload)
        this.$router.push('/profile')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.1fr 0.1fr 0.1fr 0.1fr 0.1fr 0.1fr 0.1fr;
  gap: 0px 0px;
  grid-template-areas:
    'offerTitle'
    'category '
    'locationCity '
    'locationZipCode '
    'description'
    'submitButton ';
}
.offerTitle {
  grid-area: offerTitle;
}
.category {
  grid-area: category;
}
.locationCity {
  grid-area: locationCity;
}
.locationZipCode {
  grid-area: locationZipCode;
}
.description {
  grid-area: description;
}
.submitButton {
  grid-area: submitButton;
}

label {
  display: block;
}
input,
select,
textarea {
  display: block;
  width: 100%;
  max-width: 500px;
  padding: 0.7rem;
  margin: 0 auto 1rem auto;
}
textarea {
  min-height: 6rem;
}
.submitButton {
  background-color: #4f7ca4;
  border: 1px solid grey;
  border-radius: 0.3rem;
  color: #fff;
  &:hover {
    cursor: pointer;
    background-color: #283e52;
  }
}
</style>
