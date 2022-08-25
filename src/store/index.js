import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth: auth
    }
});

export default store;