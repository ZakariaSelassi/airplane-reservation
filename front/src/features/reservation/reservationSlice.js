import { createSlice,createAsyncThunk ,current } from "@reduxjs/toolkit";
import reservationService from './reservationService'
import axios from 'axios'

const API_URL = 'http://localhost:3005/api';

const initialState = {
    isLoading:false,
    reservation : [],
    error:'',
}

export const addReservation = createAsyncThunk('reservation/add', async(idFlight,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers:{
                'Authorization': `Bearer ${token}`,
            }
        }
        const response = await axios.post(`${API_URL}/reservations/${idFlight}`, {}, config)
        return response.data
    }catch(error){
        thunkAPI.rejectWithValue(error);
    }
})
export const getReservationUser = createAsyncThunk('reservation/get', async(_,thunkAPI) => {
    try{

        const token = thunkAPI.getState().auth.user.token
        return await reservationService.getUserReservation(token)
    }catch(error){
        thunkAPI.rejectWithValue(error)
    }
})

export const deleteUserReservation = createAsyncThunk('reservation/delete', async(id,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await reservationService.deleteReservation(id,token)
    }catch(error){
        thunkAPI.rejectWithValue(error)
    }
})
export const reservationSlice = createSlice({
    name:'reservation',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(addReservation.pending, (state) => {
            state.isLoading = true;     
        })
        .addCase(addReservation.fulfilled, (state,action) => {
            state.isLoading = false;
            state.reservation = action.payload;
        })
        .addCase(addReservation.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })
        .addCase(getReservationUser.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getReservationUser.fulfilled, (state,action) => {
            state.isLoading = false;
            state.reservation = action.payload
        })
        .addCase(getReservationUser.rejected, (state,action) => {
            state.isLoading = false;
            state.reservation = null;
            state.error = action.payload.message
        })
        .addCase(deleteUserReservation.pending, (state) => {
            state.isLoading = true;     
        })
        .addCase(deleteUserReservation.fulfilled, (state,action) => {
            state.isLoading = false;
            state.reservation = Object.values(state.reservation).filter(reservation => reservation.id !== action.payload)
/*             console.log(action.payload)
            state.reservation = current(state).reservation.filter(reservation => reservation.id !== action.payload) */
        })
        .addCase(deleteUserReservation.rejected, (state,action) => {
            state.isLoading = false;
            state.reservation = null;
            state.error = action.payload.message

        })
    }
})

export default reservationSlice.reducer