import { useState } from 'react'
import StyledHeader from './StyledHeader'
import logo from '../../../assets/logo-header.png'
import logoMobil from '../../../assets/star-header.png'

import gb from '../../../assets/gb.svg'
import fr from '../../../assets/fr.svg'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IoMenu, IoClose } from "react-icons/io5";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(null);
    const {t, i18n} = useTranslation();

    const handleChange = () => {
        isOpen === true || null ? setIsOpen(false) : setIsOpen(true);
    }

    const changeLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')
    }
    return (
        <StyledHeader isOpen={isOpen}>
            <div className='mobil-container'>
                <Link className='logo-mobil' to='/'>
                    <img src={logoMobil} alt='logo explicit' />
                </Link>
                <div className='menu-mobil' onClick={handleChange}>
                    {
                        isOpen ? <IoClose /> : <IoMenu />
                    }
                </div>
            </div>
            <Link className='logo' to='/'>
                <img src={logo} alt='logo explicit' />
            </Link>
            <div className='nav-container'>
                <nav>
                    <ul>
                        <li>
                            <Link to='/services'>{t('header.services')}</Link>
                        </li>
                        <li>
                            <Link to='/artbook'>{t('header.artbook')}</Link>
                        </li>
                        <li>
                            <Link to='/services'>{t('header.history')}</Link>
                        </li>
                    </ul>
                </nav>
                <div className='container-contact'>
                    <Link className='contact' to='/services'>{t('header.contact')}</Link>
                    <button onClick={changeLanguage}><img src={i18n.language === 'en' ? gb : fr } alt='flag translation' /></button>
                </div>
            </div>
        </StyledHeader>
    )
}
