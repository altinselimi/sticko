<template>
  <div>
    <input type="text" v-model="label" placeholder="Task name">
    <textarea resizable="false" v-model="details" placeholder="Task details"></textarea>
    <button @click="addTask()">ADD</button>
  </div>
</template>
<script>
import storage from '../ext/storage.js';

export default {
  computed: {
    tasks() {
      return storage.get('__sticko-tasks') || [];
    },
  },
  data: () => ({
    label: null,
    details: null,
  }),
  methods: {
    addTask() {
      let payload = {
        label: this.label,
        details: this.details,
        status: false,
      }
      let new_tasks = this.tasks.push(payload);
      storage.set('__sticko-tasks', new_tasks);
    },
  }
};
</script>
<style>
div {
  color: blue
}
</style>