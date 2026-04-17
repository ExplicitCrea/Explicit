import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import PropTypes from 'prop-types';
import { StyledContainer } from "./StyledCompareSlider";

export const CompareSlider = ({ before, after }) => {
  return (
    <StyledContainer>
      <ReactCompareSlider
        className="react-compare-slider"
        itemOne={<ReactCompareSliderImage src={before} alt="before" />}
        itemTwo={<ReactCompareSliderImage src={after} alt="after" />}
      />
    </StyledContainer>
    );
};

CompareSlider.propTypes = {
  before: PropTypes.string.isRequired,
  after: PropTypes.string.isRequired,
};