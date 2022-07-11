import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

// get the current token user stored in local storage 
const user = JSON.parse(localStorage.getItem('token'));


const initialState = {
    loading: false,
    error: '',
    user: user ? user : null, // if user is in local storage get else return null
}

export const register = createAsyncThunk('auth/register', async(user,thunkAPI) => {
    try{
        return await authService.register(user);
    }catch(error){
        thunkAPI.rejectWithValue(error);
    }
});

export const login = createAsyncThunk('auth/login', async(user,thunkAPI) => {
    try{
        return await authService.login(user);
    }catch(error){
        thunkAPI.rejectWithValue(error);
    }
})
export const logout = createAsyncThunk('auth/logout', async(_,thunkAPI) => {
    try{
        localStorage.removeItem('token')
    }catch(error){
        thunkAPI.rejectWithValue(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload
            
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            
            state.error = action.payload.message;
        })
        .addCase(login.pending, (state) => {
            state.loading = true;
            
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload.message;
        })
        .addCase(logout.pending, (state) => {
            state.loading = true;
        })
        .addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
        }) 
        .addCase(logout.rejected, (state,action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload.message
        })
    }
})
/* export const {} = authSlice.actions; */
export default authSlice.reducer;