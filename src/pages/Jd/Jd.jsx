import StyledJd from './StyledJd';
import banner from '../../assets/jd/banner.webp';
import boat from '../../assets/jd/boat.webp';
import samourai from '../../assets/jd/samourai.webp';
import waterWave from '../../assets/jd/water-wave.webp';
import poster1 from '../../assets/jd/poster1.webp';
import poster2 from '../../assets/jd/poster2.webp';
import poster3 from '../../assets/jd/poster3.webp';
import carpentry from '../../assets/jd/carpentry.webp';
import pp from '../../assets/jd/pp.webp';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { throttle } from '../../utils/throttle';
import { Player } from '../../utils/Player';
import video from '../../assets/jd/LE GRAND JD KingJu_3.webm';

export const Jd = () => {
    const BasePos = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onMouseMove = useCallback(throttle((e, name) => {
            const card = e.currentTarget;
            const box = card.getBoundingClientRect();
            const x = e.clientX - box.left;
            const y = e.clientY - box.top;
            const centerX = box.width / 2;
            const centerY = box.height / 2;
            const rotateX = (y - centerY) / 4;
            const rotateY = (centerX - x) / 4;
            let s = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${ name.includes("L") ? rotateY : -rotateY}deg) scale3d(1, 1, 1)`;
            card.style.transform = s;
        }, 100),
        []
    )
  
    const onMouseLeave = (event) => {
        event.currentTarget.style.transform = BasePos;
    }
  
    const trans = "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s"

    const { t } = useTranslation()
    return (
        <StyledJd>
            <div className='banner-container'>
                <img className='banner' src={banner} alt="Bannière" />
                <img className='profile-picture' src={pp} alt="photo profile" />
            </div>
            <div className='global'>
                <img className='carpentry' src={carpentry} alt="menuiserie" />
                <div className='presentation'>
                    <h1>{t('jd.title')}</h1>
                    <Player video={video} />
                    <p>{t('jd.description')}</p>
                </div>
                <div className='deco'>
                    <img className='poster1' src={poster2} alt="poster" style={{transition: trans}} onMouseMove={(e) => onMouseMove(e, 'posterL')} onMouseLeave={(e)=> onMouseLeave(e)} />
                    <div className='sub-deco'>
                        <img src={poster3} alt="poster" style={{transition: trans}} onMouseMove={(e) => onMouseMove(e, 'posterL')} onMouseLeave={(e)=> onMouseLeave(e)} />
                        <img src={poster1} alt="poster" style={{transition: trans}} onMouseMove={(e) => onMouseMove(e, 'posterR')} onMouseLeave={(e)=> onMouseLeave(e)} />
                    </div>
                </div>
                <img className='deco2 wave' src={waterWave} alt="vague" />
                <img className='deco2' src={boat} alt="bateau" />
                <img className='samourai' src={samourai} alt="samourai" />
                <div className='background-filter'/>
            </div>
        </StyledJd>
    )
}
