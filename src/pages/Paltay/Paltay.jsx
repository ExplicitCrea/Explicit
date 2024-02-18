import ReactPlayer from 'react-player'
import StyledPaltay from './StyledPaltay'
import background from '../../assets/paltay/background.png'
import icon1 from '../../assets/paltay/icon1.png'
import icon2 from '../../assets/paltay/icon2.png'   
import icon3 from '../../assets/paltay/icon3.png'
import icon4 from '../../assets/paltay/icon4.png'
import { useTranslation } from 'react-i18next'

export const Paltay = () => {
    const { t } = useTranslation()
    return (
        <StyledPaltay>
            <img className='background' src={background} alt="paltay" />
            <div className='video'>
                <ReactPlayer width="100%" height="100%" url='https://youtu.be/1S8I5IHbW-I' />
            </div>
            <p>{t('paltay.description')}</p>
            <div className='picture'>
                <img src={icon1} alt="paltay" />
                <img src={icon2} alt="paltay" />
                <img src={icon3} alt="paltay" />
                <img src={icon4} alt="paltay" />
            </div>
        </StyledPaltay>
    )
}
