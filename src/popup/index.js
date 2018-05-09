import Vue from 'vue'
import Vuex from 'vuex'
import root from './root.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

const store = new Vuex.Store({
	state: {
		tasks: [],
	},
	mutations: {
		
	},
})
/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(root)
})
