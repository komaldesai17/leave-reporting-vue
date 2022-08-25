import { login } from '@/services/auth';

const KEY_TOKEN = 'token';
const KEY_EMAIL = 'email';
const KEY_ROLE = 'role';
const KEY_USER = 'user';

const auth = {
    state: {
        token: localStorage.getItem( KEY_TOKEN ) || '',
        email: localStorage.getItem( KEY_EMAIL ) || '',
        role: localStorage.getItem(KEY_ROLE) || '',
        user: localStorage.getItem(KEY_USER) || '',
    },
    getters: {
        isAuthenticated( state ) {
            return !!state.token;
        },
        isAdmin( state ) {
            return state.role === 'admin';
        }
    },
    mutations: {
        setToken( state, token ) {
            state.token = token;
        },
        setEmail( state, email ) {
            state.email = email;
        },
        setRole( state, role ) {
            state.role = role;
        },
        setUser( state, user ) {
            state.user = user;
        }
    },
    actions: {
        // credentials = { email: string, password: string }
        // login( context, credentials ) {
        login( { commit }, credentials ) {
            // console.log( context ); // { commit: fn, getters: fn, }

            return login( credentials )
                        .then( data => {
                            const { token, email, role, user } = data.data
        
                            localStorage.setItem( KEY_TOKEN, token );
                            localStorage.setItem( KEY_EMAIL, email );
                            localStorage.setItem( KEY_ROLE, role );
                            localStorage.setItem( KEY_USER, user );
                            commit( 'setToken', token );
                            commit( 'setEmail', email );
                            commit('setRole', role);
                            commit('setUser',user)
                            console.log(data)
        
                          //  return email;
                        });
        },
        logout( { commit } ) {
            localStorage.removeItem( KEY_TOKEN );
            localStorage.removeItem( KEY_EMAIL );
            localStorage.removeItem( KEY_ROLE );
        
            commit( 'setToken', '' );
            commit( 'setEmail', '' );
            commit( 'setRole', '' );

            return Promise.resolve();
        }
    }
};

export default auth;