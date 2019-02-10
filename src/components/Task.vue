<template>
  <div class="card">
    <div class="card-header">
      <div class="btn-group float-right" role="group" v-if="owner">
        <button class="btn btn-warning btn-sm" @click="edit">
          <font-awesome-icon icon="edit"/>
        </button>
        <button class="btn btn-danger btn-sm" @click="remove">
          <font-awesome-icon icon="trash"/>
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="col">
        <strong v-if="completed" class="text-success">OK</strong>
        <strong v-else class="text-danger">Pending</strong>
      </div>
      <div class="col">
        <p>{{description}}</p>
      </div>
    </div>
    <div class="card-footer">
      <p>{{author}} - {{created_at}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  props: {
    taskId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo_url: {
      type: String,
    },
    authorId: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    created_at: {
      type: String,
    },
  },
  data() {
    return {
      owner: false,
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id = {} } = user;
    this.owner = _id === this.authorId;
  },
  methods: {
    edit() {
      this.$emit('editTask', {
        id: this.taskId,
        description: this.description,
        author: this.authorId,
        completed: this.completed,
      });
    },
    remove() {
      this.$emit('removeTask', {
        id: this.taskId,
        description: this.description,
      });
    },
  },
};
</script>

<style lang="scss">
.card {
  padding-right: 0;
  padding-left: 0;
  max-width: 320px;
  .card-header {
    background-color: #4292ba;
    min-height: 56px;
  }
  .card-body {
    p {
      margin: 0;
    }
  }
  .card-footer {
    p {
      margin: 0;
    }
  }
}
</style>
