import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import { signin, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"


const Signin = () => {
  
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  
  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)

  useEffect(() => {
    
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())


  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email, 
      password
    }
    dispatch(signin(userData))
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="container">  
        <section className="heading">
          <h3>
            <FaSignInAlt /> Sign In
          </h3>
          <p>Enter your data</p>
        </section>
      </div>

      <section className="form">
        <form onSubmit={onSubmit}>


          <div className="form-group">
            <input 
                type="email"  
                className="form-control" 
                id="email" 
                name="email" 
                value={email} 
                onChange={onChange} 
                placeholder="Type your email"
            />
          </div>

          <div className="form-group">
            <input 
                type="password"  
                className="form-control" 
                id="password" 
                name="password" 
                value={password} 
                onChange={onChange} 
                placeholder="Type your password"
            />
          </div>

          <div className="form-group">
            <button className="btn" type="submit"> Sign In </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Signin