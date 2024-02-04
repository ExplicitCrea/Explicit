import { useState, useEffect } from "react";
import diapo1 from "../../assets/bruce-grannec/carousel/diapo1.webp";
import diapo2 from "../../assets/bruce-grannec/carousel/diapo2.webp";
import diapo3 from "../../assets/bruce-grannec/carousel/diapo3.webp";
import { CarouselImg } from "./StyledCarousel";

export const Carousel = () => {
  const diapos = [diapo1, diapo2, diapo3];
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
    if (currentIndex === diapos.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <CarouselImg src={diapos[currentIndex]} alt={`image ${currentIndex}`} />
    </>
  );
};
