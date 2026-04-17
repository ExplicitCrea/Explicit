import { useState } from "react";
import diapo1 from "../../assets/bruce-grannec/carousel/diapo1.webp";
import diapo2 from "../../assets/bruce-grannec/carousel/diapo2.webp";
import diapo3 from "../../assets/bruce-grannec/carousel/diapo3.webp";
import { StyledCarousel } from "./StyledCarousel";

export const Carousel = () => {
  const diapos = [diapo1, diapo2, diapo3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevDiapo = () => {
    if (currentIndex === 0) {
      setCurrentIndex(diapos.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const afterDiapo = () => {
    if (currentIndex === diapos.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <StyledCarousel>
      <div className="container-arrow-left">
        <svg
          onClick={prevDiapo}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="arrow arrow-left w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <img
        className="carousel-img"
        src={diapos[currentIndex]}
        alt={`image ${currentIndex}`}
      />
      <div className="container-arrow-right">
        <svg
          onClick={afterDiapo}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="arrow arrow-right w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <div className="radio-btn">
        {diapos.map((index, diapo) => (
          <input
            key={index}
            type="radio"
            name="radio-button"
            checked={currentIndex === diapo}
            onChange={() => setCurrentIndex(diapo)}
          />
        ))}
      </div>
    </StyledCarousel>
  );
};
