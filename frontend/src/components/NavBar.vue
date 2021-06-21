<template>
  <div id="nav">
    <ul>
      <router-link to="/"><li>Homepage</li></router-link>
      <router-link to="/about"><li>About</li></router-link>
      <a href="/api/users/initialize"><li>Init Test Data to DB</li></a>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
#nav {
  background-color: #ffffff;
  position: sticky;
  top: 0;
  padding: 0;
  z-index: 1000;
  ul {
    padding: 14px 0;
    margin: 0;
    list-style-type: none;
    display: table;
    li {
      text-align: center;
      display: inline-table;
      min-width: 200px;
      height: 50px;
      line-height: 50px;
      margin: 10px;
      background-color: rgb(52, 81, 114);
      a {
        text-decoration: none;
      }
    }
    li:hover {
      background-color: rgb(107, 85, 37);
    }
  }
}
@media (max-width: 660px) {
  #nav {
    ul {
      display: block;
      margin: 0 auto;
      li {
        display: table;
        margin: 10px;
        width: calc(100% - 10px - 10px);
      }
    }
  }
}
</style>
