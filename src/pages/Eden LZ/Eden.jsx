import { Player } from '../../utils/Player';
import StyledEden from './StyledEden';
import photo from '../../assets/eden-lz/photo.webp';
import logo from '../../assets/eden-lz/logo-.webp';
import photos from '../../assets/eden-lz/photo2.webp';
import Logo from '../../assets/eden-lz/logo.webp';
import star from '../../assets/eden-lz/star.webp';
import com from '../../assets/eden-lz/com.webp';
import chapitre from '../../assets/eden-lz/chapitre.webp';
import chapitres from '../../assets/eden-lz/chapitre1.webp';
import video from '../../assets/eden-lz/Extrait-EdenLz.webm';
import { useTranslation } from "react-i18next";

export const Eden = () => {
const { t } = useTranslation();
return (
    <StyledEden>
      <div className='global-container'>
        <div className='container-up'>
          <div className='picture-left-container'>
            <h1>{t('eden.title')}</h1>
            <img src={photo} alt='elden photo' />
          </div>
          <img className="logo" src={logo} alt='logo' />
          <img className="photos" src={photos} alt='photos' />
        </div>
          <Player video={video} />
        <div className='container-down'>
          <div className='down-left-container'>
            <div className='logo-container'>
              <img className="logo" src={Logo} alt='logo' />
              <img className="logo" src={star} alt='logo' />
            </div>
            <p>{t('eden.paragraphe')}</p>
          </div>
          <div className='down-right-container'>
            <div className='com-container'>
              <h1>MOTION</h1>
              <img src={com} alt='com' />
            </div>
            <div className='chapter-container'>
              <img className='chapter-left' src={chapitres} alt='chapitres' />
              <img className='chapter-right' src={chapitre} alt='chapitre' />
            </div>
          </div>
        </div>
      </div>
    <div className="eclipse top"></div>
    <div className="eclipse left"></div>
    <div className="eclipse right"></div>
    <div className="eclipse bottom"></div>
    </StyledEden>
  )
}
