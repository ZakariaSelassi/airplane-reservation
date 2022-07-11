import axios from 'axios';

const API_URL = 'http://localhost:3005/api/';


const register = async (userData) => {
    
   
    const response = await axios.post(`${API_URL}register`, userData);

    if(response.data){
        localStorage.setItem('token', JSON.stringify(response.data));
    }
    return response.data
}

const login = async (userData) => {
    const response = await axios.post(`${API_URL}login`, userData);
    if(response.data){
        localStorage.setItem('token', JSON.stringify(response.data));
    }
    return response.data
}

const authService = {
    register,
    login
}

export default authService;