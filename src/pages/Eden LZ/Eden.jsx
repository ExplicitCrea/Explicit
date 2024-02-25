import ReactPlayer from 'react-player'
import StyledEden from './StyledEden'
import background from '/assets/eden_lz/background.webp'
import photo from '../../assets/eden-lz/photo.webp'
import logo from '../../assets/eden-lz/logo-.webp'
import photos from '../../assets/eden-lz/photo2.webp'
import Logo from '../../assets/eden-lz/logo.webp'
import star from '../../assets/eden-lz/star.webp'
import com from '../../assets/eden-lz/com.webp'
import chapitre from '../../assets/eden-lz/chapitre.webp'
import chapitres from '../../assets/eden-lz/chapitre1.webp'
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
        <div className='video'>
          <ReactPlayer width='100%' height='100%' url='https://youtu.be/4vF-72KeuKw' />
        </div>
        <div className='container-down'>
          <div className='down-left-container'>
            <div className='logo-container'>
              <img src={Logo} alt='logo' />
              <img src={star} alt='logo' />
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
      <img className='background' src={background} alt="eden" />
    </StyledEden>
  )
}
