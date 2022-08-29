import axios from 'axios';
import config from '@/config';

const addLeave = async (id, session) => {
    const response = axios.post(`${config.baseUrl}/leave/${id.toString()}`, session

    )
    return response
}

const getLeaves = async (page, id, status) => {
    const response = await axios.get(`${config.baseUrl}/leave/${id}?`,

        {
            params: {
                find: status,
                page
            }
        }
    )
    return response.data

}

const getDashboard = async (id) => {
    const response = await axios.get(`${config.baseUrl}/dashbord/${id}`)
    console.log(response.data)
    return response.data

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
    const response = await axios.delete(`${config.baseUrl}/leave/${id.toString()}`

    )
    return response

}

const getallLeaves = async (page, status) => {
    const response = await axios.get(`${config.baseUrl}/leave?`, {
        params: {
            find: status,
            page
        }
    })
    console.log(page)
    console.log(`${config.baseUrl}/leave?`, {
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