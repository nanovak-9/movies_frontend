import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="footer">
        <div className='container'>
            <div className="logo">
                <Link to='/'>Movie<span>Shelf</span></Link>
            </div>
            <div>
              <div className='btn-container'>
                  <a href='https://github.com/nanovak-9'><FaGithub size={42} /></a>
                  <a href='https://www.linkedin.com/in/anaa-gomez/'><FaLinkedin size={42} /></a>
              </div>
              <h5>Ana Gómez</h5>
            </div>
        
        </div>
    </div>
  )
}

export default Footer