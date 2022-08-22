import axios from 'axios';
import config from '@/config';

const fetchHolidays = async () => {
    const response = axios.get(`${config.baseUrl}/holidays`)
    return response

}

const removeHoliday = async (description) => {
    const response = axios.delete(`${config.baseUrl}/holidays/${description}`)
    return response
}

const AddHoliday = async (session) => {
    const response =axios.post(`${config.baseUrl}/holidays`,session)
    return response
}


export {
    fetchHolidays,
    removeHoliday,
    AddHoliday
}