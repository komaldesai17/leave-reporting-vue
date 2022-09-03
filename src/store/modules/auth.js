import { login } from '@/services/auth';

import $cookies  from 'vue-cookies'


const KEY_TOKEN = 'token';
const KEY_EMAIL = 'email';
const KEY_ROLE = 'role';
const KEY_USER = 'user';

const auth = {
    state: {
        token: localStorage.getItem(KEY_TOKEN) || '',
        email: localStorage.getItem(KEY_EMAIL) || '',
        role: localStorage.getItem(KEY_ROLE) || '',
        user: localStorage.getItem(KEY_USER) || '',
    },
    getters: {
        isAuthenticated(state) {
            return !!state.token;
        },
        isAdmin(state) {
            return state.role === 'admin';
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setEmail(state, email) {
            state.email = email;
        },
        setRole(state, role) {
            state.role = role;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        // credentials = { email: string, password: string }
        // login( context, credentials ) {
        login({ commit }, credentials) {
            // console.log( context ); // { commit: fn, getters: fn, }

            return login(credentials)
                .then(data => {
                    const { data: { token, email, role, user } } = data
                    /*localStorage.setItem(KEY_TOKEN, token);
                    localStorage.setItem(KEY_EMAIL, email);
                    localStorage.setItem(KEY_ROLE, role);
                    localStorage.setItem(KEY_USER, user);*/

                    $cookies.set(KEY_TOKEN,token)
                    $cookies.set(KEY_EMAIL, email)
                    $cookies.set(KEY_ROLE,role)
                    $cookies.set(KEY_USER,user)
                    
                    commit('setToken', token);
                    commit('setEmail', email);
                    commit('setRole', role);
                    commit('setUser', user)

                    //dispatchAuthEvents();


                    return email;
                });
        },
        logout({ commit }) {
            /*localStorage.removeItem(KEY_TOKEN);
            localStorage.removeItem(KEY_EMAIL);
            localStorage.removeItem(KEY_ROLE);
            localStorage.removeItem(KEY_USER);*/

            $cookies.remove(KEY_TOKEN)
            $cookies.remove(KEY_EMAIL)
            $cookies.remove(KEY_ROLE)
            $cookies.remove(KEY_USER)


            commit('setToken', '');
            commit('setEmail', '');
            commit('setRole', '');
            commit('setUser', '');



            return Promise.resolve();
        }
    }
};

export default auth;