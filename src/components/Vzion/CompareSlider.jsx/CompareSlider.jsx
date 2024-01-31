import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { StyledContainer } from "./StyledCompareSlider";

import before from "../../../assets/vzion/compare-slider/before.jpg";
import after from "../../../assets/vzion/compare-slider/after.jpg";

export const CompareSlider = () => {
    return (
      <StyledContainer>
        <ReactCompareSlider
          className="react-compare-slider"
          itemOne={<ReactCompareSliderImage
            src={before} alt="before"
          />}
          itemTwo={<ReactCompareSliderImage 
            src={after} alt="after"
          />}
        />
      </StyledContainer>
    );
  };
