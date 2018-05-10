<template>
  <div class="settings">
    <el-input type="text" v-model="label" placeholder="Task name" v-if="!is_rajesh" />
    <el-input type="textarea" :rows="2" placeholder="Details" v-model="details">
    </el-input>
    <div style="margin-left: auto;">
      <label>Is Rajesh</label>
      <el-switch v-model="is_rajesh">
      </el-switch>
    </div>
    <el-button type="primary" icon="el-icon-plus" circle @click="addTask()"></el-button>
  </div>
</template>
<script>
export default {
  computed: {
    hellothere() {
      return this.$store.state.hello;
    },
  },
  data: () => ({
    label: null,
    details: null,
    is_rajesh: true,
  }),
  methods: {
    addTask() {
      let payload = {
        label: this.label || '',
        description: this.details || 'No details',
        id: this.uuid(),
        dont_style: this.is_rajesh,
      };
      this.commitTask(payload);
    },
    commitTask(payload) {
      this.$store.commit('ADD_NOTE', payload);
    },
    uuid() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    },
    tab() {
      chrome.tabs.create({ url: 'pages/app.html' })
    }
  }
};
</script>
<style lang="scss">
body {
  margin: 0px;
}

.settings {
  min-width: 300px;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  >div {
    margin-bottom: 15px;
  }
}
</style>