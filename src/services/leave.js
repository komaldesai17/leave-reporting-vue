import axios from 'axios';
import config from '@/config';
//import Vue from 'vue';
//import VueAxios from 'vue-axios'
/*
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);
*/
const addLeave = async (session) => {
    const response = axios.post(`${config.baseUrl}/leave`, session, { withCredentials: true }/*{
        headers: {
            'Access-Control-Allow-Credentials': 'true'

        }
    }*/)
    return response
}

export {
    addLeave,
}