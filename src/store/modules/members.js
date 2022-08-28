import { getUsers } from "@/services/users";



const member = {
    state: {
        members: [],
        error: '',
        status: 'UNDEFIND'

    },
    getters: {
        getuserID(state) {
            return (mail) => {
                return state.members.filter(m => m._id === mail);

            };
        },
        getemail(state) {
            return {
                email: state.members.map(m => m.email),
                id: state.members.map(m => m._id)

            }
        }
    },
    mutations: {
        setMembers(state, payload) {
            state.members = payload
        },
        setError(state, payload) {
            state.error = payload;
        },
        changeStatus(state, payload) {
            state.status = payload;
        }

    },
    actions: {

        async getUsers({ commit }) {
            commit('changeStatus', 'loading')

            try {
                const response = await getUsers();
                commit('setMembers', response.data.data);
                commit('changeStatus', 'LOADED');
            } catch (error) {
                commit('setError', error.message);
                commit('changeStatus', 'ERROR');
            }


        }

    }
};


export default member;