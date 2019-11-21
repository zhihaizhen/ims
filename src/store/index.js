import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app.js';
import user from './modules/user';
import http from './modules/http.js';
import data from './modules/data.js';
import dictionary from './modules/dictionary.js';
import keepAlive from './modules/keepAlive.js';
import getters from './getters';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,user,http,data,keepAlive,dictionary
    },
    getters,
    actions
});
