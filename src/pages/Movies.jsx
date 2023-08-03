import Spinner from '../components/Spinner'
import { getMovies, reset } from "../features/movies/movieSlice"
import { myData } from "../features/auth/authSlice"
import MovieCardFull from "../components/MovieCardFull"
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

const Movies = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)

    const {movies, isLoading, isError, isSuccess, message} = useSelector((state) => state.movie)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
    
        if(!user) {
          navigate('/signin')
        } else {
          dispatch(getMovies())
          dispatch(myData())
        }
    
        return () => {
          dispatch(reset)
        }
    
      }, [user, navigate, isError, isSuccess, message, dispatch])

      if(isLoading) {
        return <Spinner />
      }

    return (
        <div className="container">
          <div className="btn-container">
              <button className="btn" type="button" onClick={() => {
                  navigate('/')
                  }}>
                      Return to Dashboard
              </button>
          </div>
          <section className="movies-container">
            {movies.length > 0 ? 
              movies.map((movie) => 
                  (
                    <MovieCardFull key={movie._id} movie = {movie} />
                  )
                ) : (
                  <h3>No liked movies</h3>
                )
            }
          </section>
        </div>
    )
}

export default Movies