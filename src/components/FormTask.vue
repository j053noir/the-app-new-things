<template>
  <form class="container" id="formTask">
    <div class="form-group">
      <label>Description</label>
      <textarea class="form-control" v-model="description" cols="30" rows="3"></textarea>
    </div>
    <div class="form-group">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="completed"
          value
        >
        <label class="form-check-label" for="defaultCheck1">Is completed?</label>
      </div>
    </div>
    <div class="form-group">
      <label>Author</label>
      <select v-model="author" class="form-control">
        <option
          v-for="user in users"
          :key="user._id"
          :value="user._id"
        >{{user.fullname}}</option>
      </select>
    </div>
    <div class="form-group">
      <button
        type="button"
        v-bind:disabled="loading"
        class="btn btn-success"
        @click="save"
      >{{button}}</button>
    </div>
  </form>
</template>

"<style lang="scss">
#formTask {
  max-width: 320px;
  background-color: #ccc;
  border-radius: 25px;
  padding: 25px;

  label {
    font-weight: bold;
  }
}
</style>


<script>
import { authHeader } from '../_helpers';

export default {
  name: 'formTask',
  data() {
    return {
      id: '',
      description: '',
      author: '',
      completed: false,
      users: [],
      loading: false,
      button: 'Save',
    };
  },
  created() {
    fetch(`${process.env.VUE_APP_API_ROOT}/users`, {
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
      if (this.loading === false) {
        this.loading = true;
        this.button = '...';
        this.$emit('save', {
          id: this.id,
          description: this.description,
          author: this.author,
          completed: this.completed,
        });
      }
    },
    setTask(task) {
      if (this.loading === false) {
        this.id = task.id;
        this.description = task.description;
        this.author = task.author;
        this.completed = task.completed;
      }
    },
    reset() {
      this.id = '';
      this.description = '';
      this.author = '';
      this.completed = false;
      this.loading = false;
      this.button = 'Save';
    },
  },
};
</script>
