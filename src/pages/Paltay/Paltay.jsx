import ReactPlayer from 'react-player'
import StyledPaltay from './StyledPaltay'
import background from '../../assets/paltay/background.webp'
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
        </StyledPaltay>
    )
}
