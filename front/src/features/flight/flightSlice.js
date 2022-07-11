import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import flightService  from "./flightService";

const initialState = {
    flights:[],
    flight: [],
    loading:false,
    error:'',
}

export const fetchAll = createAsyncThunk('flight/all', async(_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await flightService.fetchAllFlights(token);

    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const fetchSingle = createAsyncThunk('flight/single', async(id,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await flightService.fetchSingleFlight(token,id);
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

const flightSlice = createSlice({
    name:'flight',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAll.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAll.fulfilled, (state, action) => {
            state.loading = false;
            state.flights = action.payload
        })
        .addCase(fetchAll.rejected, (state, action) => {
            state.loading = false;
            state.flights = null;
            state.error = action.payload.message;
        })
        .addCase(fetchSingle.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchSingle.fulfilled, (state,action) => {
            state.loading = false;
            //console.log(action.payload)
            state.flight = action.payload;
        })
        .addCase(fetchSingle.rejected, (state,action) => {
            state.loading = false;
            state.flight = null;
            state.error = action.payload.message
        })
    }
})


export default flightSlice.reducer;