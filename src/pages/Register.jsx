import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa"
import { register, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"


const Register = () => {

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })
  
  const { name, email, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)

  useEffect(() => {
    
    if(isError) {
    toast.error(message)
    }

    if(isSuccess || user) {
    navigate('/signin')
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

    if(password !== password2){
      toast.error('Passwords do not match!')
    }else{
      const userData ={
        name,
        email,
        password
      }

      dispatch(register(userData))
    
    }

  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="container">
        <section className="heading">
          <h3>
            <FaUser /> Registration
          </h3>
          <p>Create New Account</p>
        </section>
      </div>

      <section className="form">
        <form onSubmit={onSubmit}>

          <div className="form-group">
            <input 
                type="text"  
                className="form-control" 
                id="name" 
                name="name" 
                value={name} 
                onChange={onChange} 
                placeholder="Type your name"
            />
          </div>

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
            <input 
                type="password"  
                className="form-control" 
                id="password2" 
                name="password2" 
                value={password2} 
                onChange={onChange} 
                placeholder="Confirm password"
            />
          </div>

          <div className="form-group">
            <button className="btn" type="submit"> Create Account </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register