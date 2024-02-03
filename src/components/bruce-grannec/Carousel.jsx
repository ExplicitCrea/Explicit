import { useState, useEffect } from "react";
import image1 from "../../assets/bruce-grannec/carousel/diapo1.webp";
import image2 from "../../assets/bruce-grannec/carousel/diapo2.webp";
import image3 from "../../assets/bruce-grannec/carousel/diapo3.webp";
import { CarouselImg } from "./StyledCarousel";

export const Carousel = () => {
  const images = [image1, image2, image3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      changeCurrentIndex();
    }, 15000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentIndex]);

  const changeCurrentIndex = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <CarouselImg src={images[currentIndex]} alt={`image ${currentIndex}`} />
    </>
  );
};
