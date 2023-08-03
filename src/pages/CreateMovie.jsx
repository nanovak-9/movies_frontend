import NewMovieForm from "../components/NewMovieForm"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useSelector } from "react-redux"

const CreateMovie = () => {

    const navigate = useNavigate()

    const {movies, isLoading, isError, isSuccess, message} = useSelector((state) => state.movie)

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
        <NewMovieForm/>
    </div>
  )
}

export default CreateMovie