<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-if="loggedIn">
      <Tasks msg="Welcome to 'The all new things' app"/>
    </div>
    <div v-else>
      <Login @logged="onLoggedIn"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Tasks from '@/components/Tasks.vue';
import Login from '@/components/Login.vue';

export default {
  name: 'home',
  components: {
    Tasks,
    Login,
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    onLoggedIn(value) {
      this.loggedIn = value;
      this.$emit('loggedIn', this.loggedIn);
    },
  },
};
</script>
