import StyledGg from './StyledGg'
import logoMiddle from '../../assets/gg/logo-middle.webp'
import logoTop from '../../assets/gg/logo-top.webp'
import gameplay from '../../assets/gg/gameplay.webp'
import scene from '../../assets/gg/scene.webp'
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
                    {/* <Player video={video} /> */}
                </div>
                <img className='logo-middle' src={logoMiddle} alt="logo gg on top"/>
                <p>{t('gg.description')}</p>
                <div className='right-container'>
                    <img className='scene' src={scene} alt="gg-scene"/>
                </div>
                <img className='logo-top' src={logoTop} alt="logo gg"/>
                <img className='background' src='/assets/gg/deco.webp' alt="background-gg"/>
            </div>
        </StyledGg>
    )
}
