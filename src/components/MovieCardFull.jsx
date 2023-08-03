import { useDispatch } from "react-redux"
import { deleteMovie, addMovieToLikes, getMovies } from '../features/movies/movieSlice'
import { FaHeart, FaFilm } from "react-icons/fa"
import {toast} from 'react-toastify'



const imgUrl = "https://image.tmdb.org/t/p/w300"

const MovieCardFull = ({movie}) => {
  
  const dispatch = useDispatch()

  return (
    
      <div className="movie-item">
        {movie.poster_path ? 
          (
            <img className="movie-poster" 
                 src={`${imgUrl}${movie.poster_path}`} 
                 alt="Movie Poster"></img>
          ) : (
            <div className="no-image">
              <FaFilm size={42} />
              <h5>No Available Image</h5>
            </div>
          )}
        <h4>{movie.title}</h4>
        <button className="close" onClick={() => {
          dispatch(addMovieToLikes(movie._id))
          dispatch(getMovies())
          }}>
            <FaHeart/><h6>{movie.likes}</h6>
        </button>
        <h5>{movie.overview}</h5>
        <button className="movie-delete" onClick={() => {
          dispatch(deleteMovie(movie._id))
          }}>Delete</button>
        </div>
  )
}

export default MovieCardFull