<template>
  <div id="app">
    <div id="nav" v-if="navbarShow">
      <router-link to="/">Tasks</router-link>
    </div>
    <router-view @loggedIn="loggedIn"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      navbarShow: false,
    };
  },
  methods: {
    loggedIn(value) {
      this.navbarShow = value;
    },
  },
};
</script>


<style lang="scss">
body {
  height: 100vh;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: inherit;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
