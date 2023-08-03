import { useDispatch } from "react-redux"
import { deleteMovieFromLikes } from "../features/movies/movieSlice"
import { myData } from "../features/auth/authSlice"
import { FaFilm } from "react-icons/fa"

const imgUrl = "https://image.tmdb.org/t/p/w300"

const MovieCard = ({movie}) => {

  const dispatch = useDispatch()
  
    return (
    <>
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
            dispatch(deleteMovieFromLikes(movie._id))
            dispatch(myData())
            }}>
              x
          </button>
          <h5>{movie.overview}</h5>

      </div>
    </>
  )
}

export default MovieCard