import { configureStore } from "@reduxjs/toolkit";
// importe all reducers here
import authReducer from '../features/auth/authSlice'
import flightReducer from '../features/flight/flightSlice'
import reservationReducer from '../features/reservation/reservationSlice'
const store = configureStore({
    reducer: {
        // reducer here
        auth: authReducer,
        flight: flightReducer,
        reservation: reservationReducer
    },
})

export default store;