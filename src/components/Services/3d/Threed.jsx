import ReactPlayer from 'react-player'
import StyledThreed from './StyledThreed'
import logo_3d from '../../../assets/3d/3D.png'
import top from '../../../assets/3d/top.png'
import bottom from '../../../assets/3d/bottom.png'
import background from '../../../assets/3d/background.png'
import phone_background from '../../../assets/3d/phone_background.png'
import { useTranslation } from 'react-i18next'

export const Threed = () => {
  const { t } = useTranslation()
  return (
    <StyledThreed>
      <div className='background'>
        <img src={background} alt='3d' className="pc"/>
        <img src={phone_background} alt='3d' className = "phone"/>
      </div>
      <div className="top">
        <img src={logo_3d} alt='3d' />
        <img src={top} alt='partie du haut' />
      </div>
      <p>{t('threed.description')}</p>
      <div className='video'>
        <ReactPlayer width='100%' height='100%' url='https://youtu.be/KpNqp44Olk0' controls={true}/>
      </div>
      <div className="bottom">
        <img src={bottom} alt='partie du bas' />
      </div>
    </StyledThreed>
  )
}

