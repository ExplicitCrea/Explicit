import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// import required modules
import { EffectCoverflow, Navigation } from 'swiper/modules';
import StyledAudio from "./StyledAudio"
import { Card } from './Card/Card';
import { ArrayAudio } from '../../../utils/ArrayAudio/ArrayAudio';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export const Audio = () => {
  const { t } = useTranslation()
  return (
    <StyledAudio>
        <h1 className='title'>{t('audio.title')}</h1>
        <p className='description'>
          {t('audio.description')}
        </p>
        <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'2'}
        loop={true}
        navigation={true}
        modules={[Navigation, EffectCoverflow]}
        className="mySwiper"
      >
        {
          ArrayAudio.map((audio, index) => (
            <SwiperSlide key={index} className='slider'>
              <Card name={audio.name} file={audio.file} />
            </SwiperSlide>
          ))
        }
      </Swiper>
      <span>
        {t('audio.conclusion')}
      </span>
      <Link className='contact' to='/contact'>Contact</Link>
    </StyledAudio>
  )
}
