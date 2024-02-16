import StyledFooter from './StyledFooter'
import background from './../../../assets/footer.png'
import logo from '../../../assets/logo-header.png'
import { Link } from 'react-router-dom'

export const Footer = () => {

return (
      <StyledFooter>
            <img className='background' src={background} alt='footer'/>
            <div className='column'>
                  <Link to='/history' className='link history'> 
                        Notre Histoire
                  </Link>
                  <Link to='/' className='link Shop'> 
                        Shop
                  </Link>
            </div>
            <div className='column'>
                  <Link to="/contact" className='link contact'>
                        Contact
                  </Link>
                  <Link to="/artbook" className='link Art Book'>
                        Art Book
                  </Link>
            </div>
            <div className='column'>
                  <Link className='logo' to= "/" >  
                        <img src={logo} alt='logo'/>
                  </Link>
            </div>
            <div className='column'>
                  <Link to="/services" className='link Services'>
                        Services
                  </Link>
                  <Link to="/faq" className='link Help'>
                        Aide
                  </Link>
            </div>
            <div className='column'>
                  <Link to="/legal-disclaimer" className='link Legal Disclaimer'>
                        Mention légal
                  </Link>
                  <Link className='link CGU'>
                        CGU CGV
                  </Link>
            </div>
      </StyledFooter>
)
}

