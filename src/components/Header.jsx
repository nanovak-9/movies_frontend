import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {signout, reset} from '../features/auth/authSlice'


const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)

  const onSignout = () => {
    dispatch(signout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <>
    
    
    <header className='header'>
      <div className="logo">
        <Link to='/'>Movie<span>Shelf</span></Link>
      </div>
      <ul>

        {user ? 
          (
            <li>
              <button className='btn' onClick={onSignout}>
                <FaSignOutAlt /> <span>Sign Out</span>
              </button>
            </li>
          ) : (
          <> 
            <li>
              <Link to='/signin'>
                <FaSignInAlt /> <span>Sign In</span>
              </Link>
            </li>

            <li>
              <Link to='/register'>
                <FaUser /><span>Register</span>
              </Link>
            </li>
          </>
          )
        }

       
        
      </ul>
    </header>
    </>
  )
}

export default Header