import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import member from './modules/members'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth: auth,
        member: member
    }
});

export default store;