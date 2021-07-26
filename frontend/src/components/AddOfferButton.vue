<template>
  <div class="fixedContainer">
    <div class="container">
      <div class="addSign">
        <div class="bar horizontal"></div>
        <div class="bar vertical"></div>
      </div>
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
  width: 90px;
  height: 90px;
  margin-bottom: -40px;
  transition: margin-bottom 0.3s ease;
}
.container:hover {
  margin-bottom: 0px;
  transition: margin-bottom 0.3s ease;
  transition: transform 0.5s ease;
  transform: rotate(180deg);
}
.addSign {
  position: relative;
  background-color: #4f7ca4;
  width: 90px;
  height: 90px;
  border-radius: 50%;
}
.addSign:hover {
  cursor: pointer;
}
// Plus sign CSS gratefully copied from here https://stackoverflow.com/questions/41051094/making-a-plus-sign-with-css
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
