import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    listOfMovies: []
}

// New User Registration

export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// User Sign in

export const signin = createAsyncThunk('auth/signin', async(user, thunkAPI) => {
    try {
        return await authService.signin(user)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// User Sign out

export const signout = createAsyncThunk('auth/signout', async () => {
    await authService.signout() 
})

export const myData = createAsyncThunk('auth/mydata', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.myData(token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}) 

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state) => {
            state.isError= false
            state.isSuccess= false
            state.isLoading= false
            state.message= ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(signout.fulfilled, (state) => {
            state.user = null
        })
        .addCase(signin.pending, (state) => {
            state.isLoading = true
        })
        .addCase(signin.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(signin.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(myData.pending, (state) => {
            state.isLoading = true
        })
        .addCase(myData.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.listOfMovies = action.payload.listOfMovies
        })
        .addCase(myData.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
