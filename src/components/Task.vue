<template>
  <div class="card">
    <div class="card-header">
      <button class="btn btn-warning btn-sm float-right" @click="edit">Edit</button>
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
  methods: {
    edit() {
      this.$emit('editTask', {
        id: this.taskId,
        description: this.description,
        author: this.authorId,
        completed: this.completed
      })
    }
  }
};
</script>

<style lang="scss">
.card {
  max-width: 320px;
  margin: auto;
  .card-header {
    background-color: #4292ba;
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
