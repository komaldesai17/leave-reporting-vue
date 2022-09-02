import axios from 'axios';
import config from '@/config';

const addLeave = async (id, session) => {
    const response = await axios.post(`${config.baseUrl}/leave/${id.toString()}`, session

    )
    return response.data
}

const getLeaves = async (page, id, status,start,end) => {
    const response = await axios.get(`${config.baseUrl}/leave/${id}?`,

        {
            params: {
                find: status,
                page,
                start,
                end
            }
        }
    )
    return response.data

}

const getDashboard = async (id) => {
    const response = await axios.get(`${config.baseUrl}/dashbord/${id}`)
    return response.data

}

const changeStatus = async (id, status) => {
    const response = await axios.patch(`${config.baseUrl}/leave/${id}?`,

        {
            status
        }
    )
    return response.data

}

const cancelLeave = async (id) => {
    const response = await axios.delete(`${config.baseUrl}/leave/${id.toString()}`

    )
    return response.data

}

const getallLeaves = async (page, status) => {
    const response = await axios.get(`${config.baseUrl}/leave?`, {
        params: {
            find: status,
            page
        }
    })
    return response.data

}

export {
    addLeave,
    getLeaves,
    cancelLeave,
    changeStatus,
    getallLeaves,
    getDashboard
}