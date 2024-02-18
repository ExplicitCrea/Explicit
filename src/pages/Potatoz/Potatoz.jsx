import StyledPotatoz from './StyledPotatoz'
import title from '../../assets/potatoz/title.png'
import potatoz from '../../assets/potatoz/potatoz.png'
import ReactPlayer from 'react-player'
import follow from '../../assets/potatoz/follow.png'
import { useTranslation } from 'react-i18next'

export const Potatoz = () => {
    const { t } = useTranslation()
    return (
        <StyledPotatoz>
            <div className='wrapper-title'>
                <img className='title' src={title} alt="title"/>
            </div>
            <div className='container'>
                <div className='video'>
                    <div className='wrapper'>
                        <ReactPlayer width='100%' height='100%' url='https://youtu.be/oZscojGNz_I' />
                        <img className='deco' src={potatoz} alt="potatoz"/>
                    </div>
                </div>
                <div className='description'>
                    <img className='follow' src={follow} alt="followers"/>
                    <p>{t('potatoz.description')}</p>
                </div>
            </div>
        </StyledPotatoz>
    )
}
