import axios from 'axios';
import config from '@/config';

const addLeave = async (session) => {
    const response = axios.post(`${config.baseUrl}/leave`, session, { withCredentials: true }
      )
    return response
}

const getLeaves = async (id) => {
    const response = axios.get(`${config.baseUrl}/leave/${id}`)
    return response

}

export {
    addLeave,
    getLeaves
}