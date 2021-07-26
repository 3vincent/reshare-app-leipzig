<template>
  <div class="fixedContainer">
    <div class="container">
      <router-link to="/addOffer">
        <div class="addSign">
          <div class="bar horizontal"></div>
          <div class="bar vertical"></div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddOfferButton',
}
</script>
<style lang="scss" scoped>
.fixedContainer {
  position: fixed;
  z-index: 1000;
  width: 100%;
  bottom: 0;
  display: block;
  margin: 0;
  padding: 0.3rem 0;
  background-color: transparent;
}
.container {
  margin: 0 auto;
  border-radius: 50%;
  padding: 3px;
  border: 4px solid #4f7ca4;
  // alternative to border, from here https://stackoverflow.com/a/51496341
  // background: linear-gradient(140deg, red, yellow, green), linear-gradient(to right, #9c20aa, #fb3570);
  width: 100px;
  height: 100px;
  margin-bottom: -60px;
  transition: margin-bottom 0.3s ease 50ms, transform 0.5s ease 0ms;
  &:hover {
    margin-bottom: 0px;
    transition: margin-bottom 0.3s ease 50ms, transform 0.5s ease 0ms;
    transform: rotate(180deg);
    border: 4px solid #7ca44f;
  }
}
.addSign {
  position: relative;
  margin: 0 auto;
  margin-top: 5px;
  background-color: #4f7ca4;
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

// CSS Plus sign gratefully copied from here https://stackoverflow.com/questions/41051094/making-a-plus-sign-with-css
.bar {
  margin: 0 auto;
  position: absolute;
  background-color: #ffffff;
}
.horizontal {
  width: 70%;
  height: 20%;
  left: 15%;
  top: 40%;
}
.vertical {
  width: 20%;
  height: 70%;
  left: 40%;
  top: 15%;
}
</style>
