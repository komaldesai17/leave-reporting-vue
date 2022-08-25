import axios from 'axios';
import config from '@/config';

const addLeave = async (id, session) => {
    const response = axios.post(`${config.baseUrl}/leave/${id.toString()}`,session
    
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