import Vue from 'vue';
import Vuex from 'vuex'
import VuexWebExtensions from 'vuex-webextensions'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        notes: {
        },
        store_initiated: false,
    },
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
            let id = payload.id;
            Vue.set(state.notes, id, { ...state.notes[id], ['status']: payload.status });
        },
        SET_INITIATED_STATUS: (state, payload) => {
            state.store_initiated = payload;
        },
    },
    getters: {
        notesArr: state => Object.keys(state.notes).map(key => ({...state.notes[key], ['id']: key})),
        focused_exists: state => Object.keys(state.notes).find(key => !!state.notes[key]['focused']),
    },
    plugins: [VuexWebExtensions()],
});