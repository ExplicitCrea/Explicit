import React from 'react'
import StyledFooter from './StyledFooter'
import { useTranslation } from 'react-i18next';
import footer from './../../../assets/footer.png'
import { useLocation } from 'react-router-dom';
import logo from '../../../assets/logo-header.png'
import { Link } from 'react-router-dom'

export const Footer = () => {
      const location = useLocation();
      const excludedPages = ['/faq', '/services','/legal-disclaimer','/artbook'];
      const isExcludedPage = excludedPages.includes(location.pathname);
      if (isExcludedPage) {
        return null; 
      }
return (
<StyledFooter>
      <div className='container-footer'>
            <img src= {footer} alt='footer'></img>
                  <div className='column'>
                        <Link to='/history' className='link history'> 
                              <h3>Notre Histoire</h3>
                        </Link>
                  </div>
                  <div className='column'>
                        <Link to="/contact" className='link contact'>
                              <h3>Contact</h3>
                        </Link>
                        <Link to="/artbook" className='link Art Book'>
                              <h3>Art Book</h3>
                        </Link>
                  </div>
                  <div >
                        <Link className='logo' to= "/" >  
                              <img src={logo} alt='logo'></img>
                        </Link>
                  </div>
                  <div className='column'>
                        <Link to="/services" className='link Services'>
                              <h3>Services</h3>
                        </Link>
                        <Link to="/faq" className='link Help'>
                              <h3>Aide</h3>
                        </Link>
                  </div>
                  <div className='column'>
                        <Link to="/legal-disclaimer" className='link Legal Disclaimer'>
                              <h3>Mention légal</h3>
                        </Link>
                        <Link className='link CGU'>
                              <h3>CGU CGV</h3>
                        </Link>
                  </div>
      </div>
      </StyledFooter>
)
}

