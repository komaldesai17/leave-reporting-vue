import config from '@/config';
import axios from 'axios';


const getUsers = async () => {
    const response = await axios.get(`${config.baseUrl}/user`)
    return response
}

export {
    getUsers
}