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
  const all_audios = [];
  const Loaded_audio = (audio, setIsPlaying) => {
    all_audios.push([audio, setIsPlaying]);
  }//to get all audios as loaded elements with their setIsPlaying function

  const pause_all_audio = () => {
    all_audios.forEach((item) => {
      let audio = item[0];
      let setIsPlaying = item[1];
      audio.pause();//we don't reset the time because we want to continue the audio where it was paused
      setIsPlaying(false);
    });
  }//pause all audios

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
        onSlideChange={()=>{pause_all_audio();}}
      >
        {
          ArrayAudio.map((audio, index) => (
            <SwiperSlide key={index} className='slider'>
              <Card name={audio.name} file={audio.file} onLoad={(audio,setIsPlaying) => Loaded_audio(audio,setIsPlaying)} />
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
