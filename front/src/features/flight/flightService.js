import axios from 'axios'

const API_URL = "http://localhost:3005/api/"


const fetchAllFlights = async (token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
  
    const response = await axios.get(`${API_URL}flights`,config)
   
    return response.data.flightsWithAirplane
}

const fetchSingleFlight = async (token,idFlight) => {
    
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.get(`${API_URL}flights/${idFlight}`,config)
    return response.data
}

const flightService = {
    fetchAllFlights,
    fetchSingleFlight
}

export default flightService;
