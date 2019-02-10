<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>These are your tasks</p>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else class="container">
      <div class="row">
        <div class="col-12">
          <nav aria-label="Page pagination">
            <ul class="pagination align-items-center">
              <li class="page-item prev">
                <a class="page-link" @click="prevPage">Previous</a>
              </li>
              <li
                class="page-item"
                v-for="pag in pages"
                v-bind:class="{ 'active': pag === page }"
                :key="pag"
              >
                <a class="page-link" @click="goPage(pag)">{{pag}}</a>
              </li>
              <li class="page-item next">
                <a class="page-link" @click="nextPage">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 mb-3">
          <formTask @save="create" ref="formTask"></formTask>
        </div>
        <div class="col-12 col-md-6">
          <div class="row d-flex">
            <task
              v-for="item in items"
              @editTask="editTask"
              @removeTask="removeTask"
              class="align-self-stretch col-12 col-lg-6 mb-1"
              :key="item.id"
              :taskId="item.id"
              :authorId="item.authorId"
              :photo="item.photo_url"
              :description="item.description"
              :author="item.author"
              :created_at="item.createdAt"
              :completed="item.completed"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authHeader, formatDate } from '../_helpers';
import Task from './Task.vue';
import FormTask from './FormTask.vue';

export default {
  name: 'List',
  data() {
    return {
      page: 1,
      total: 0,
      pages: [],
      items: [],
      loading: true,
    };
  },
  components: {
    task: Task,
    formTask: FormTask,
  },
  props: {
    msg: String,
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    create(task) {
      const headers = { 'Content-Type': 'application/json' };
      const method = task.id ? 'PUT' : 'POST';
      fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method,
        body: JSON.stringify(task),
        headers: Object.assign(headers, authHeader()),
      })
        .then(response => response.json())
        .then(data => {
          if (!data.success) {
            alert(data.message);
            if (data.statusCode === 401) {
              this.logout();
            }
          } else {
            const { item = {} } = data;
            const { author = {} } = item;
            const {
              _id = {},
              firstname = 'anonimo',
              lastname = '',
              photoUrl,
            } = author;
            const date = formatDate(new Date(item.createdAt));
            const newTask = {
              id: item._id,
              photoUrl,
              authorId: _id,
              description: item.description,
              completed: item.completed,
              author: `${firstname} ${lastname}`,
              createdAt: date,
            };

            const index = this.items.findIndex(t => t.id === newTask.id);

            if (index > 0) {
              Object.assign(this.items[index], newTask);
            } else {
              this.items.unshift(newTask);
              this.splice(this.items.length - 1, 1);
            }
            this.$refs.formTask.reset();
          }
        });
    },
    editTask(task) {
      this.$refs.formTask.setTask(task);
    },
    removeTask(task) {
      const r = confirm(`Do you want to delete "${task.description}"?`);
      if (r === true) {
        const headers = { 'Content-Type': 'application/json' };
        fetch(`${process.env.VUE_APP_API_ROOT}/tasks/${task.id}`, {
          method: 'DELETE',
          headers: Object.assign(headers, authHeader()),
        })
          .then(response => response.json())
          .then(data => {
            if (!data.success) {
              alert(data.message);
              if (data.statusCode === 401) {
                this.logout();
              }
            } else {
              alert('Task removed');
              // Could just task from this.items but ¯\_(ツ)_/¯
              this.fetchTasks();
            }
          });
      }
    },
    prevPage() {
      this.page = this.page - 1;
      if (this.page < 1) {
        this.page = 1;
      }
      this.fetchTasks();
    },
    nextPage() {
      this.page = this.page + 1;
      if (this.page >= this.pages.length) {
        this.page = this.pages.length;
      }
      this.fetchTasks();
    },
    goPage(page) {
      this.page = page;
      this.fetchTasks();
    },
    fetchTasks() {
      fetch(
        `${
          process.env.VUE_APP_API_ROOT
        }/tasks?limit=10&sortby=createdAt&direction=desc&page=${this.page}`,
        {
          headers: authHeader(),
        },
      )
        .then(response => response.json())
        .then(data => {
          if (!data.success) {
            if (data.statusCode === 401) {
              this.logout();
            }
          } else {
            const { items = [], meta = {} } = data;
            const tasks = items.map(item => {
              const { author = {} } = item;
              const {
                _id,
                firstname = 'anonimo',
                lastname = '',
                photo_url,
              } = author;
              const date = formatDate(new Date(item.createdAt));
              return {
                id: item._id,
                photo_url,
                authorId: _id,
                description: item.description,
                completed: item.completed,
                author: `${firstname} ${lastname}`,
                createdAt: date,
              };
            });

            this.page = meta.page ? meta.page : 1;
            this.pages = [];
            // eslint-disable-next-line no-plusplus
            for (let index = 0; index < meta.pages; index++) {
              this.pages.push(index + 1);
            }
            this.total = meta.total;
            this.items = tasks;
            this.loading = false;
          }
        });
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      location.reload(true);
    },
  },
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
.pagination {
  .page-item {
    margin: 0;
    &.prev {
      margin-left: auto;
    }
    &.next {
      margin-right: auto;
    }
  }
}
</style>
