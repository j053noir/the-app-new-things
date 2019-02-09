<template>
  <form class="container" id="formTask">
    <div class="form-group">
      <label>Description</label>
      <textarea class="form-control" v-model="description" cols="30" rows="3"></textarea>
    </div>
    <div class="form-group">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value>
        <label class="form-check-label" for="defaultCheck1">Is completed?</label>
      </div>
    </div>
    <div class="form-group">
      <label>Author</label>
      <select v-model="author" class="form-control">
        <option v-for="user in users" :key="user._id" :value="user._id">{{user.fullname}}</option>
      </select>
    </div>
  </form>
</template>

<style>
#formTask {
  max-width: 320px;
}
</style>


<script>
import { authHeader } from '../_helpers';

export default {
  name: 'formTask',
  data() {
    return {
      description: '',
      author: '',
      completed: false,
      users: [],
    };
  },
  created() {
    fetch('http://localhost:3000/api/users', {
      headers: authHeader(),
    })
      .then(response => response.json())
      .then(data => {
        const { items = [] } = data;
        const users = items.map(item => {
          const { _id, firstname = '', lastname = '' } = item;
          return {
            _id,
            fullname: `${firstname} ${lastname}`,
          };
        });

        this.users = users;
      });
  },
  methods: {
    save() {
      this.$emit('save', {
        description: this.description,
        author: this.author,
        completed: this.completed,
      });
    },
  },
};
</script>
