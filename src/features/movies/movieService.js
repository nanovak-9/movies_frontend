import axios from "axios";

const API_URL = 'https://uptight-jade-horse.cyclic.cloud/api/movies/'

//Create New Movie

const createMovie = async(movieData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, movieData, config)

    return response.data

}

//Get Movies

const getMovies = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data

}


//Delete Movies

const deleteMovie = async(movieId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + movieId, config)

    return response.data

}

//Delete Movies From Likes

const deleteMovieFromLikes = async(movieId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + 'likes_less/' + movieId, {}, config)

    return response.data

}

//Add Movie To Likes

const addMovieToLikes = async (movieId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + 'likes/' + movieId, {}, config)

    return response.data
}

const movieService = {
    createMovie,
    getMovies,
    deleteMovie,
    deleteMovieFromLikes,
    addMovieToLikes
}

export default movieService