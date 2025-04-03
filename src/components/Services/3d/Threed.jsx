import { Player } from "../../../utils/Player.jsx";
import StyledThreed from './StyledThreed';
import logo_3d from '../../../assets/3d/3D.webp';
import top from '../../../assets/3d/top.webp';
import bottom from '../../../assets/3d/bottom.webp';
import background from '../../../assets/3d/background.webp';
import phone_background from '../../../assets/3d/phone_background.webp';
import video from "../../../assets/3d/video.webm";
import { useTranslation } from 'react-i18next';

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
        <Player video={video}/>
      <div className="bottom">
        <img src={bottom} alt='partie du bas' />
      </div>
    </StyledThreed>
  )
}

