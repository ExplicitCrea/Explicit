import StyledGg from './StyledGg'
import ReactPlayer from 'react-player';
import logoMiddle from '../../assets/gg/logo-middle.png'
import logoTop from '../../assets/gg/logo-top.png'
import gameplay from '../../assets/gg/gameplay.jpg'
import scene from '../../assets/gg/scene.jpg'
import { useTranslation } from 'react-i18next';

export const Gg = () => {
    const { t } = useTranslation();
    return (
        <StyledGg>
            <div className='container'>
                <div className='left-container'>
                    <div className='image'>
                        <img src={gameplay} alt="gg-gameplay"/>
                    </div>
                    <div className='video'>
                        <ReactPlayer width='100%' height='100%' url='https://youtu.be/swtF21GLr8A' />
                    </div>
                </div>
                <img className='logo-middle' src={logoMiddle} alt="logo gg on top"/>
                <p>{t('gg.description')}</p>
                <div className='right-container'>
                    <img className='scene' src={scene} alt="gg-scene"/>
                </div>
                <img className='logo-top' src={logoTop} alt="logo gg"/>
                <img className='background' src='/assets/gg/deco.png' alt="background-gg"/>
            </div>
        </StyledGg>
    )
}
