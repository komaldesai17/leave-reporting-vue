import config from '@/config';
import  axios  from 'axios';


const login = async (session) => {
    const response = await axios.post(`${config.baseUrl}/user/login`, session)
    return response
}

export {
    login
}