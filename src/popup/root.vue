<template>
  <div class="settings">
    <el-input type="text" v-model="label" placeholder="Task name" v-if="!pre_editable && !split_rows" />
    <el-input type="textarea" :rows="2" :placeholder="pre_editable ? 'Text' : 'Details'" v-model="details">
    </el-input>
    <button type="button" @click="more_options = !more_options" class="more-options"><i :class="!more_options ? `el-icon-arrow-down` : `el-icon-arrow-up`"></i><span>More Options</span></button>
    <ul class="options" v-show="more_options">
      <li>
        <label>Pre Editable</label>
        <el-switch v-model="pre_editable" active-color="#13ce66" inactive-color="#C0CCDA" class="farleft">
        </el-switch>
      </li>
      <li>
        <label>Split Rows</label>
        <el-switch v-model="split_rows" active-color="#13ce66" inactive-color="#C0CCDA" class="farleft">
        </el-switch>
      </li>
      <li class="split-indicator" v-if="split_rows">
        <label>Split Indicator</label>
        <el-input style="width:50px;" class="farleft" small type="text" v-model="split_indicator">
        </el-input>
        <br>
        <span class="info">Defaults to new line</span>
      </li>
    </ul>
    <el-button class="add-button" type="primary" icon="el-icon-plus" @click="(label || details) && addTask()">ADD NEW TASK</el-button>
  </div>
</template>
<script>
export default {
  computed: {
    store_initation_status() {
      return this.$store.state.store_initiated;
    },
  },
  data: () => ({
    label: null,
    details: null,
    pre_editable: false,
    split_rows: false,
    split_indicator: null,
    more_options: false,
  }),
  methods: {
    addTask() {
      let payload = {
        label: this.label || '',
        description: this.details || 'No details',
        id: this.uuid(),
        dont_style: this.pre_editable,
        focused: false,
      };
      let payloads = null;

      if (this.split_rows) {
        payloads = [];
        let all = payload.description.split(this.split_indicator || '\n');
        all.forEach(nth_description => {
          let tempPayload = { ...payload, ['id']: this.uuid(), ['description']: nth_description };
          payloads.push(tempPayload);
        });
      }

      if (payloads) {
        payloads.forEach(_payload => {
          this.commitTask(_payload);
        });
      } else {
        this.commitTask(payload);
      }

      if (this.store_initation_status === false) {
        this.$store.commit('SET_INITIATED_STATUS', true);
        chrome.tabs.query({}, function(tabs) {
          let tabids = tabs.reduce((b, a) => {
            return b.concat(a['id']);
          }, []).forEach(id => {
            chrome.tabs.reload(id);
          });
        });
      }

    },
    commitTask(payload) {
      this.$store.commit('ADD_NOTE', payload);
      this.label = null;
      this.details = null;
    },
    uuid() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    },
  }
};
</script>
<style lang="scss">
body {
  margin: 0px;
}

* {
  box-sizing: border-box;
}

button {
  --webkit-appearance: none;
  border: none;
  padding: 5px;
  &:focus {
    outline: none;
    box-shadow: 0 0 1px 1px rgba(black, .1);
  }
}

button.more-options {
  margin-left: auto;
  span {
    margin-left: 5px;
  }
  border-radius: 5px;
  overflow: hidden;
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
  .options {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    background-color: whitesmoke;
    width: 100%;
    border-radius: 8px;
    padding: 0px 15px;
    list-style: none;
    >li {
      display: flex;
      position: relative;
      align-items: center;
      padding: 10px 0px;
      border-top: solid 1px darken(whitesmoke, 10);
      &:first-child {
        margin-top: 0px;
        border-top-color: transparent;
      }
      .farleft {
        margin-left: auto;
      }
    }
    label {
      margin-right: 15px;
      font-weight: 500;
      color: lighten(black, 40);
    }
    .info {
      position: absolute;
      right: 0;
      top: calc(100% - 16px);
      opacity: .5;
      font-size: 10px;
    }
    .split-indicator {
      padding-bottom: 20px;
      position: relative;
      input {
        height: 30px;
      }
    }
  }
  .add-button {
    margin-top: 15px;
    width: 100%;
    i {
      font-weight: bold;
    }
  }
}
</style>