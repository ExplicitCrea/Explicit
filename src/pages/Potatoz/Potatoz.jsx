
import StyledPotatoz from './StyledPotatoz';
import title from '../../assets/potatoz/title.webp';
import potatoz from '../../assets/potatoz/potatoz.webp';
import extraitAsset from '../../assets/potatoz/Extrait StreamPack Potatoz - Explicit.webm';
import jouets from '../../assets/potatoz/jouets.webp';
import light from '../../assets/potatoz/lumiere.webp';
import { useTranslation } from 'react-i18next';
import { Player } from '../../utils/Player';

export const Potatoz = () => {
    const { t } = useTranslation()
    return (
        <StyledPotatoz>
            <img src={light} alt="light" className='lumiere'/>
            <div className='wrapper-title'>
                <img className='title' src={title} alt="title"/>
            </div>
            <div className='container'>
                <div className='videowrapper'>
                    <div className="wrapper_double">
                        <img className='deco' src={potatoz} alt="potatoz"/>
                        <img className='explo_jouet' src={jouets} alt="jouets"/>
                    </div>
                    <div className='wrapper'>
                        <Player video={extraitAsset} />
                    </div>
                </div>
                    <p className='description'>{t('potatoz.description')}</p>
            </div>
        </StyledPotatoz>
    )
}
