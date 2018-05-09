import Vue from 'vue';
Vue.config.productionTip = false

var sticky_chrome_plugin = document.createElement('div')
sticky_chrome_plugin.setAttribute('id', 'sticko-chrome-plugin');
document.body.appendChild(sticky_chrome_plugin);
import notes from './notes.vue';

new Vue({
  el: '#sticko-chrome-plugin',
  render: h => h(notes)
});