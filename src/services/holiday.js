import axios from 'axios';
import config from '@/config';
import store from '@/store';

const fetchHolidays = async () => {
    const response = await axios.get(`${config.baseUrl}/holidays`)

    return response.data

}

const removeHoliday = async (description) => {
    const response = await axios.delete(`${config.baseUrl}/holidays/${description}`, {
        headers: {
            Authorization: `${store.state.auth.token}`
        }
    })
    return response.data
}

const AddHoliday = async (session) => {
    const response = await axios.post(`${config.baseUrl}/holidays`, session, {
        headers: {
            Authorization: `${store.state.auth.token}`
        }
    })
    return response.data
}


export {
    fetchHolidays,
    removeHoliday,
    AddHoliday
}