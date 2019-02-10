<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-if="loggedIn">
      <Tasks msg="Welcome to 'The all new things' app"/>
    </div>
    <div v-else>
      <SignIn @logged="onLoggedIn"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Tasks from '@/components/Tasks.vue';
import SignIn from '@/components/SignIn.vue';

export default {
  name: 'home',
  components: {
    Tasks,
    SignIn,
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
