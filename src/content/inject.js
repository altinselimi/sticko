import Vue from 'vue';
Vue.config.productionTip = false
import store from '../store';
import notes from './notes.vue';


const renderVueComponent = () => {
	var sticky_chrome_plugin = document.createElement('div')
	sticky_chrome_plugin.setAttribute('id', 'sticko-chrome-plugin');
	document.body.appendChild(sticky_chrome_plugin);
	console.log('tring to inject script');
	new Vue({
		el: '#sticko-chrome-plugin',
		store,
		render: h => h(notes)
	});
};

renderVueComponent();