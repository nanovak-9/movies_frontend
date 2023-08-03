import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieService from "./movieService";

const initialState = {
    movies: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create New Movie
export const createMovie = createAsyncThunk('movies/create', async(movieData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await movieService.createMovie(movieData, token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Delete Movie
export const deleteMovie = createAsyncThunk('movies/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await movieService.deleteMovie(id, token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Delete Movie From likes
export const deleteMovieFromLikes = createAsyncThunk('movies/deleteFromLikes', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await movieService.deleteMovieFromLikes(id, token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Add Movie To likes
export const addMovieToLikes = createAsyncThunk('movies/addToLikes', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await movieService.addMovieToLikes(id, token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get Movies
export const getMovies = createAsyncThunk('movies/get', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await movieService.getMovies(token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}) 


export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(builder) => {
        builder
        .addCase(createMovie.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createMovie.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.movies.push(action.payload.movie)
        })
        .addCase(createMovie.rejected, (state, action) => {
            state.isLoading = false
            state.isError= true
            state.message = action.payload
        })
        .addCase(getMovies.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getMovies.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.movies = action.payload
        })
        .addCase(getMovies.rejected, (state, action) => {
            state.isLoading = false
            state.isError= true
            state.message = action.payload
        })
        .addCase(deleteMovie.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteMovie.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.movies = state.movies.filter((movie)=> movie._id !== action.payload.id) 
        })
        .addCase(deleteMovie.rejected, (state, action) => {
            state.isLoading = false
            state.isError= true
            state.message = action.payload
        })
        .addCase(deleteMovieFromLikes.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteMovieFromLikes.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload.id 
        })
        .addCase(deleteMovieFromLikes.rejected, (state, action) => {
            state.isLoading = false
            state.isError= true
            state.message = action.payload
        })
        .addCase(addMovieToLikes.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addMovieToLikes.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload.id 
        })
        .addCase(addMovieToLikes.rejected, (state, action) => {
            state.isLoading = false
            state.isError= true
            state.message = action.payload
        })
    }

})

export const {reset} = movieSlice.actions

export default movieSlice.reducer