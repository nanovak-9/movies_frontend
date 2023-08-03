import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createMovie, getMovies } from '../features/movies/movieSlice'

const NewMovieForm = () => {

    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createMovie({title, overview}))
        setTitle('')
        setOverview('')
    }
  
    return (
    <section className="form-container">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <h2>Create New Movie</h2>
                <label htmlFor='title'>Title</label>
                <input type="text" name='title' id='title' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                <label htmlFor='overview'>Overview</label>
                <input type="text" name='overview' id='overview' value={overview} onChange={(e)=>setOverview(e.target.value)}></input>
            </div>
            <div className="form-group">
                <button className="btn" type='submit'>Create New Movie</button>
            </div>
        </form>
    </section>
  )
}

export default NewMovieForm