import axios from 'axios';
import config from '@/config';

const fetchHolidays = async () => {
    const response = await axios.get(`${config.baseUrl}/holidays`)

    return response.data

}

const removeHoliday = async (description) => {
    const response = await axios.delete(`${config.baseUrl}/holidays/${description}`)
    return response.data
}

const AddHoliday = async (session) => {
    const response = axios.post(`${config.baseUrl}/holidays`, session)
    return response
}


export {
    fetchHolidays,
    removeHoliday,
    AddHoliday
}