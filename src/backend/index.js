import store from '../store';

import { setSharedStore } from 'vuex-webextensions'

let initiatedSharedStore;
setSharedStore(store);

setTimeout(() => {
	setSharedStore(store);
}, 4000);