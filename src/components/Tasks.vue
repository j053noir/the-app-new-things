<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>These are your tasks</p>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-6">
          <task
            v-for="item in items"
            class="mb-1"
            :key="item._id"
            :photo="item.photo_url"
            :description="item.description"
            :author="item.author"
            :created_at="item.createdAt"
            :completed="item.completed"
          />
        </div>
        <div class="col-6">
          <formTask @save="create"></formTask>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authHeader } from '../_helpers';
import { formatDate } from '../_helpers';
import Task from './Task';
import FormTask from './FormTask';

export default {
  name: 'List',
  data() {
    return {
      page: 1,
    }
  },
  components: {
    task: Task,
    formTask: FormTask,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      loading: true,
      items: [],
    };
  },
  created() {
    fetch(`http://localhost:3000/api/tasks?limit=10&sortby=createdAt&direction=desc&page=${this.page}`, {
      headers: authHeader(),
    })
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          if (data.statusCode === 401) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        } else {
          const { items = [] } = data;
          const tasks = items.map(item => {
            const { author = {} } = item;
            const { firstname = 'anonimo', lastname = '', photo_url }  = author;
            const date = formatDate(new Date(item.createdAt));
            return {
              photo_url,
              description: item.description,
              completed: item.completed, 
              author: `${firstname} ${lastname}`,
              createdAt: date
            };
          });

          this.items = tasks;
          this.loading = false;
        }
      });
  },
  methods: {
    create(task) {
      console.log('task created', task);
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
