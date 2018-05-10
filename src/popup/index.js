import Vue from 'vue'
import Vuex from 'vuex'
import root from './root.vue'
import store from '../store';
import {getSharedStore} from 'vuex-webextensions'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

getSharedStore(store);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#root',
	store,
	render: h => h(root)
});