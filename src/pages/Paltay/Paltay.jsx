import ReactPlayer from 'react-player'
import StyledPaltay from './StyledPaltay'
import background from '../../assets/paltay/background.webp'
import icon from '../../assets/paltay/icon1.webp'
import icon2 from '../../assets/paltay/icon2.webp'
import icon3 from '../../assets/paltay/icon3.webp'
import icon4 from '../../assets/paltay/icon4.webp'
import maxlinker from '../../assets/paltay/maxlinker.webp'
import naykii from '../../assets/paltay/naykii.webp'
import paltay from '../../assets/paltay/paltay.webp'
import s73 from '../../assets/paltay/s73.webp'
import { useTranslation } from 'react-i18next'

export const Paltay = () => {
    const { t } = useTranslation()
    return (
        <StyledPaltay>
            <img className='background' src={background} alt="paltay" />
            <div className='video'>
                <ReactPlayer width="100%" height="100%" url='https://youtu.be/1S8I5IHbW-I' controls={true}/>
            </div>
            <div className="icon_list">
                {
                    [icon, icon2, icon3, icon4, maxlinker, naykii, paltay, s73].map((icon, index) => {
                        if (index < 4) return <img key={index} src={icon} alt="icon" />
                        else return <img key={index} src={icon} className="person" alt="person" />
                    })
                }
            </div>
            <p>{t('paltay.description')}</p>
        </StyledPaltay>
    )
}
