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


export const Audio = () => {
  return (
    <StyledAudio>
        <h1 className='title'>Metier du sons</h1>
        <p className='description'>
          En complément à tous nos services de productions visuelles nous avions aussi une alternative sensitive avec des propositions auditive comme du doublage, de la voix off ou de la production de piste audio personnaliser.
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
        Vous pouvez aussi nous contacter par mail
      </span>
      <Link className='contact' to='/contact'>Contact</Link>
    </StyledAudio>
  )
}
