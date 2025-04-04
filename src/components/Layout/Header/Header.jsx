import { useState } from 'react'
import StyledHeader from './StyledHeader'
import logo from '../../../assets/logo-header.webp'
import logoMobil from '../../../assets/star-header.webp'

import gb from '../../../assets/gb.svg'
import fr from '../../../assets/fr.svg'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IoMenu, IoClose } from "react-icons/io5";
import useWindowSize from '../../../utils/useWindowSize'

import logo_insta from '../../../assets/logo_insta.svg';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(null);
    const {t, i18n} = useTranslation();
    const isSmallScreen = useWindowSize(900)

    const handleChange = () => {
        isOpen === true || null ? setIsOpen(false) : setIsOpen(true);
    }

    const handleClick = () => {
        isSmallScreen && setIsOpen(false)
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
                            <Link onClick={handleClick} to='/services'>{t('header.services')}</Link>
                        </li>
                        <li>
                            <Link onClick={handleClick} to='/artbook'>{t('header.artbook')}</Link>
                        </li>
                        <li>
                            <Link onClick={handleClick} to='/history'>{t('header.history')}</Link>
                        </li>
                    </ul>
                </nav>
                <div className='container-contact'>
                    <button className='insta'><a href='https://www.instagram.com/explicit.crea/' target='_blank' rel='noreferrer'><img src={logo_insta} alt='logo instagram' /></a></button>
                    <Link onClick={handleClick} className='contact' to='/contact'>{t('header.contact')}</Link>
                    <button onClick={changeLanguage}><img src={i18n.language === 'en' ? gb : fr } alt='flag translation' /></button>
                </div>
            </div>
        </StyledHeader>
    )
}
