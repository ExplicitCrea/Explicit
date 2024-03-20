import StyledPotatoz from './StyledPotatoz'
import title from '../../assets/potatoz/title.webp'
import potatoz from '../../assets/potatoz/potatoz.webp'
import ReactPlayer from 'react-player'
import jouets from '../../assets/potatoz/jouets.webp'
import light from '../../assets/potatoz/lumiere.webp'
import { useTranslation } from 'react-i18next'

export const Potatoz = () => {
    const { t } = useTranslation()
    return (
        <StyledPotatoz>
            <img src={light} alt="light" className='lumiere'/>
            <div className='wrapper-title'>
                <img className='title' src={title} alt="title"/>
            </div>
            <div className='container'>
                <div className='video'>
                    <div className="wrapper_double">
                        <img className='deco' src={potatoz} alt="potatoz"/>
                        <img className='explo_jouet' src={jouets} alt="jouets"/>
                    </div>
                    <div className='wrapper'>
                        <ReactPlayer width='100%' height='100%' url='https://youtu.be/oZscojGNz_I' controls={true}/>
                    </div>
                </div>
                    <p className='description'>{t('potatoz.description')}</p>
            </div>
        </StyledPotatoz>
    )
}
