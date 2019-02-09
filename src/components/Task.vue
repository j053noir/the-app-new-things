<template>
  <div class="card">
    <div class="card-header">
      <button class="btn btn-primary btn-sm float-right">Edit</button>
    </div>
    <div class="card-body">{{description}}</div>
    <div class="card-footer">
      <p>{{author}} - {{created_at}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  props: {
    description: {
      type: String,
      required: true,
    },
    photo_url: {
      type: String,
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
};
</script>

<style lang="scss">
.card {
  max-width: 320px;
  margin: auto;
  .card-footer {
    p {
      margin: 0;
    }
  }
}
</style>
