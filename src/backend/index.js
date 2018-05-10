import {setSharedStore} from 'vuex-webextensions'
import store from '../store';
setSharedStore(store);
/*browser.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'storeinit') {
        return Promise.resolve(store.state[message.key]);
    }
});*/