import Vue from 'vue';
Vue.config.productionTip = false
import { getSharedStore } from 'vuex-webextensions'
import store from '../store';
import notes from './notes.vue';

getSharedStore(store);

var sticky_chrome_plugin = document.createElement('div')
sticky_chrome_plugin.setAttribute('id', 'sticko-chrome-plugin');

setTimeout(() => {
	document.body.appendChild(sticky_chrome_plugin);

	new Vue({
		el: '#sticko-chrome-plugin',
		store,
		render: h => h(notes)
	});
}, 500);