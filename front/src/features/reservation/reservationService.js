import axios from 'axios'

const API_URL = 'http://localhost:3005/api';


const createReservation = async (flightId,token) => {

    //console.log(flightId,token)
    const config = {
        headers:
        { Authorization: `Bearer ${token}`,}
    }
    

    const response = await axios.post(`${API_URL}/reservations/${flightId}`,{},config)

    return response.data
}

const getUserReservation = async (token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/reservations`,config)
    return response.data
}

const deleteReservation = async (id,token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL}/reservations/${id}`,config)
    return response.data
}
const reservationService = {
    createReservation,
    getUserReservation,
    deleteReservation
}

export default reservationService;