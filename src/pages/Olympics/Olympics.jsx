import ReactPlayer from 'react-player'
import StyledOlympics from './StyledOlympics'
import logo from '../../assets/olympics/logo.png'
import explict from '../../assets/star-header.png'
import deco from '../../assets/olympics/deco.png'
import deco1 from '../../assets/olympics/deco1.png'
import deco2 from '../../assets/olympics/deco2.png'
import { useTranslation } from 'react-i18next'

export const Olympics = () => {
    const { t } = useTranslation();
    return (
        <StyledOlympics>
            <div className='pictures-container'>
                <div className='logo'>
                    <img src={explict} alt="logo explicit"/>
                    <img src={logo} alt="logo olympics"/>
                </div>
                <img className='deco' src={deco2} alt="decoration"/>
                <img className='deco' src={deco1} alt="decoration"/>
            </div>
            <div className='video'>
                <ReactPlayer width='100%' height='100%' url='https://www.youtube.com/shorts/srydA31W3wI' />
            </div>
            <div className='text-container'>
                <p>{t('jo.description')}</p>
                <img src={deco} alt="decoration"/>
            </div>
        </StyledOlympics>
    )
}
