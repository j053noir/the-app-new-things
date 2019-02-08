<template>
  <div class="container">
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
      >
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
      >
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        @click="submit"
      >Sign in</button>
      <p class="mt-5 mb-3 text-muted">© 2019</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    submit() {
      this.$emit('logged', true);
    },
  },
};
</script>

<style lang="scss">
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  .checkbox {
    font-weight: 400;
  }
  .form-control {
    position: relative;
    //Instead of the line below you could use @include box-sizing($bs)
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
    &:focus {
      z-index: 2;
    }
  }
  input[type='email'] {
    margin-bottom: -1px;
    //Instead of the line below you could use @include border-bottom-right-radius($radius)
    border-bottom-right-radius: 0;
    //Instead of the line below you could use @include border-bottom-left-radius($radius)
    border-bottom-left-radius: 0;
  }
  input[type='password'] {
    margin-bottom: 10px;
    //Instead of the line below you could use @include border-top-left-radius($radius)
    border-top-left-radius: 0;
    //Instead of the line below you could use @include border-top-right-radius($radius)
    border-top-right-radius: 0;
  }
}
</style>
