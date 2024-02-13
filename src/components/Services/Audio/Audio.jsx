import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// import required modules
import { EffectCoverflow, Navigation } from 'swiper/modules';
import StyledAudio from "./StyledAudio"
import { Card } from './Card/Card';


export const Audio = () => {
  return (
    <StyledAudio>
        <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'3'}
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 20,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        navigation={true}
        modules={[Navigation, EffectCoverflow]}
        className="mySwiper"
      >
        <SwiperSlide className='Slider'>
          <Card />
        </SwiperSlide>
      </Swiper>
    </StyledAudio>
  )
}
