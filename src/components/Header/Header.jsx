import StyledHeader from './StyledHeader'
import logo from '../../assets/logo-header.png'
import gb from '../../assets/gb.svg'
import fr from '../../assets/fr.svg'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Header = () => {
    const {t, i18n} = useTranslation();

    const changeLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')
    }
    return (
        <StyledHeader>
            <div className='container'>
                <img src={logo} alt='logo explicit' />
                <nav>
                    <ul>
                        <li>
                            <Link to='/services'>{t('header.services')}</Link>
                        </li>
                        <li>
                            <Link to='/services'>{t('header.artbook')}</Link>
                        </li>
                        <li>
                            <Link to='/services'>{t('header.history')}</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='container'>
                <Link className='contact' to='/services'>{t('header.contact')}</Link>
                <button onClick={changeLanguage}><img src={i18n.language === 'en' ? gb : fr } alt='flag translation' /></button>
            </div>
        </StyledHeader>
    )
}
