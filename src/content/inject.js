import Vue from 'vue';
Vue.config.productionTip = false
import { getSharedStore } from 'vuex-webextensions'
import store from '../store';
import notes from './notes.vue';

getSharedStore(store);

var checkIfRendered;
var initialRender;

initialRender = setTimeout(() => {
	if (document.body) {
		renderVueComponent();
	}
}, 500);

checkIfRendered = setTimeout(() => {
	let sticky_element = document.getElementById('sticko-chrome-plugin');
	if (sticky_element) {
		clearTimeout(checkIfRendered);
	} else {
		renderVueComponent();
	}
}, 2300);

const renderVueComponent = () => {
	var sticky_chrome_plugin = document.createElement('div')
	sticky_chrome_plugin.setAttribute('id', 'sticko-chrome-plugin');
	document.body.appendChild(sticky_chrome_plugin);
	new Vue({
		el: '#sticko-chrome-plugin',
		store,
		render: h => h(notes)
	});
	clearInterval(initialRender);
	clearTimeout(checkIfRendered);
};