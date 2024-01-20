import { useState } from 'react';
import image1 from '../../assets/Bruce_Grannec/image1.webp';
import image2 from '../../assets/Bruce_Grannec/image2.webp';
import image3 from '../../assets/Bruce_Grannec/image3.webp';
import {
  CarouselContainer
}
from './StyledCarousel'

export const Carousel = () => {
  const images = [image1, image2, image3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex];
  
  function ChangeCurrentIndex() {

    if(currentIndex === images.length -1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex +1)
    }
  }

  setTimeout(() => {
    ChangeCurrentIndex()
  }, 15000)

  return (
    <CarouselContainer>
        <img src={currentImage} alt={'image' + currentIndex}/>
    </CarouselContainer>
  )
}
