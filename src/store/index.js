import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);
/*import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'*/
// import createMutationsSharer from 'vuex-shared-mutations';

export default new Vuex.Store({
    state: {
        notes: {
        },
        hello: 'Hello World',
    },
    // plugins: [createMutationsSharer({ predicate: ['SET_HELLO'] })],
    mutations: {
        SET_NOTES: (state, payload) => {
            state.notes = payload;
        },
        ADD_NOTE: (state, payload) => {
            console.log('Setting using vue set');
            Vue.set(state.notes, payload.id, payload);
        },
        REMOVE_NOTE: (state, payload) => {
            let new_notes = { ...state.notes };
            delete new_notes[payload.id];
            state.notes = new_notes;
        },
        TOGGLE_FOCUS_NOTE: (state, payload) => {
            let id = payload.id;
            Vue.set(state.notes, id, { ...state.notes[id], ['focused']: !state.notes[id].focused });
        },
        SET_NOTE_STATUS: (state, payload) => {
            console.log('status was toggled');
            let id = payload.id;
            Vue.set(state.notes, id, { ...state.notes[id], ['status']: payload.status });
        },
        SET_HELLO: (state, payload) => {
            state.hello = payload;
        },
    },
    getters: {
        notesArr: state => Object.keys(state.notes).map(key => ({...state.notes[key], ['id']: key})),
    },
});

console.log('Sticko store created');

/*plugins: [createPersistedState({
    storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: key => Cookies.remove(key)
    }
})],*/