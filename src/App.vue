<template>
  <div id="app">
    <div id="nav" v-if="navbarShow">
      <router-link to="/">Tasks</router-link>&nbsp;|
      <a class="signout" @click="logout">Sign out</a>
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
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      location.reload(true);
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
    cursor: pointer;
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
    &.signout {
      color: crimson;
    }
  }
}
</style>
