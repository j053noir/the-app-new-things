<template>
  <div class="container">
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="firstname" class="sr-only">Firstname</label>
      <input
        type="text"
        v-model="firstname"
        class="form-control"
        placeholder="Firstname"
        required
        autofocus
      >
      <label for="lastname" class="sr-only">Lastname</label>
      <input
        type="text"
        v-model="lastname"
        class="form-control"
        placeholder="Lastname"
        required
        autofocus
      >
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        v-model="email"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
      >
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        v-model="password"
        class="form-control"
        placeholder="Password"
        required
      >
      <button
        class="btn btn-lg btn-success btn-block"
        type="button"
        @click="submit"
      >Sign up</button>
      <div class="form-group mt-3">
        <router-link class to="/">Back</router-link>
      </div>
      <p class="mt-5 mb-3 text-muted">© 2019</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    };
  },
  methods: {
    submit() {
      const form = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
      };
      fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (!data.success) {
            alert(data.message);
          } else {
            alert('User created');
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>
