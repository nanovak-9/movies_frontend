import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from '../components/Spinner'
import { getMovies, reset } from "../features/movies/movieSlice"
import { myData } from "../features/auth/authSlice"
import MovieCard from "../components/MovieCard"
import {toast} from 'react-toastify'


const Dashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, listOfMovies} = useSelector((state) => state.auth)

  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.movie)

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
    <>
      <div className="container">
        <section className="heading">
          <h2>Welcome, {user && user.name}!</h2>
          <p>Would you like to:</p>
          <div className="btn-container">
            <button className="btn" type="button" onClick={() => {
              navigate('/movies')
            }}>
                Browse Movies
            </button>
            <button className="btn" type="button" onClick={() => {
              navigate('/create')}}>
                Create Movie
            </button>
          </div>
        </section> 
        
        <section>
        <p>Here's a List of your all-time favorite movies:</p>
        {listOfMovies.length > 0 ? 
          (
            <div className="likes-container">
              {listOfMovies.map((movie)=>(
                <MovieCard key={movie._id} movie = {movie} />
              ))}
            </div>
          ) : (
            <h3>No liked movies</h3>
          )
        }

        </section>
      </div>
    </> 
  )
}

export default Dashboard