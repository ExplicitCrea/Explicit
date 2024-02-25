import StyledFooter from './StyledFooter'
import background from './../../../assets/footer.webp'
import logo from '../../../assets/logo-header.webp'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";

export const Footer = () => {
const { t } = useTranslation();
return (
      <StyledFooter>
            <img className='background' src={background} alt='footer'/>
            <div className='column'>
                  <Link to='/history' className='link history'> 
                        {t("footer.title")}
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
                        {t("footer.title2")}
                  </Link>
            </div>
            <div className='column'>
                  <Link to="/legal-disclaimer" className='link Legal Disclaimer'>
                        {t("footer.title3")}
                  </Link>
                  <Link className='link CGU'>
                        CGU CGV
                  </Link>
            </div>
      </StyledFooter>
)
}

