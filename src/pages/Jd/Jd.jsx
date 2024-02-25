import StyledJd from './StyledJd'
import banner from '../../assets/jd/banner.webp'
import boat from '../../assets/jd/boat.webp'
import samourai from '../../assets/jd/samourai.webp'
import waterWave from '../../assets/jd/water-wave.webp'
import poster1 from '../../assets/jd/poster1.webp'
import poster2 from '../../assets/jd/poster2.webp'
import poster3 from '../../assets/jd/poster3.webp'
import carpentry from '../../assets/jd/carpentry.webp'
import pp from '../../assets/jd/pp.webp'
import ReactPlayer from 'react-player'
import { useTranslation } from 'react-i18next'

export const Jd = () => {
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
                    <div className='video'>
                        <ReactPlayer width='100%' height='100%' url='https://youtu.be/WbvqtvnWBZs' />
                    </div>
                    <p>{t('jd.description')}</p>
                </div>
                <div className='deco'>
                    <img className='poster1' src={poster2} alt="poster" />
                    <div className='sub-deco'>
                        <img src={poster3} alt="poster" />
                        <img src={poster1} alt="poster" />
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
