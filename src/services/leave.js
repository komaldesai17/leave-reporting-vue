import axios from 'axios';
import config from '@/config';

const addLeave = async (id, session) => {
    const response = axios.post(`${config.baseUrl}/leave/${id.toString()}`, session

    )
    return response
}

const getLeaves = async (id, status) => {
    const response = axios.get(`${config.baseUrl}/leave/${id}?`,

        {
            params: {
                find: status
            }
        }
    )
    return response

}

const changeStatus = async (id, status) => {
    const response = axios.patch(`${config.baseUrl}/leave/${id}?`,

        {
            status
        }
    )
    return response

}

const cancelLeave = async (id) => {
    const response = axios.delete(`${config.baseUrl}/leave/${id.toString()}`

    )
    return response

}

const getallLeaves = async (status) => {
    const response = axios.get(`${config.baseUrl}/leave/?`,{
        params: {
            find: status
        }
    })
    return response

}

export {
    addLeave,
    getLeaves,
    cancelLeave,
    changeStatus,
    getallLeaves
}